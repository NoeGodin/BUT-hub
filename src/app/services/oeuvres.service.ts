import { Injectable, inject } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { Firestore, collectionData, } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class OeuvresService {
  oeuvres$: Observable<Oeuvre[]>;
  private storage: Storage = inject(Storage);

  constructor(private firestore: Firestore) {
    const oeuvresCollection = collection(this.firestore, 'oeuvres');
    this.oeuvres$ = collectionData(oeuvresCollection,{ idField: 'id' }) as Observable<Oeuvre[]>;
  }

  getAllOeuvres(): Observable<Oeuvre[]> {
    this.oeuvres$.forEach(oeuvre => console.log(oeuvre))
    return this.oeuvres$;
  }

  OeuvreById(oeuvreId: string): Observable<Oeuvre | undefined> {
    return this.oeuvres$.pipe(
      map(oeuvres => oeuvres.find(oeuvre => oeuvre.id === oeuvreId))
    );
  }

  addOeuvre(oeuvre: Oeuvre) {
    const placeRef = collection(this.firestore, 'oeuvres');
    const oeuvreData = {
      titre: oeuvre.titre,
      auteur: oeuvre.auteur,
      imageUrl: oeuvre.imageUrl,
      description: oeuvre.description,
      date: oeuvre.date,
      courant: oeuvre.courant,
      like: 0,
    };

  return addDoc(placeRef, oeuvreData);
  }

  uploadFile(input: HTMLInputElement): Promise<string[]> {
    return new Promise((resolve, reject) => {
        if (!input.files) {
            reject(new Error('Aucun fichier sélectionné.'));
            return;
        }

        const files: FileList = input.files;
        const downloadURLs: string[] = [];

        const uploadPromises = Array.from(files).map((file) => {
            const storageRef = ref(this.storage, 'Galerie/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise<void>((fileResolve, fileReject) => {
                uploadTask.then((snapshot) => {
                    getDownloadURL(storageRef).then((downloadURL) => {
                        downloadURLs.push(downloadURL);
                        fileResolve();
                    }).catch((error) => {
                        fileReject(error);
                    });
                }).catch((error) => {
                    fileReject(error);
                });
            });
        });

        Promise.all(uploadPromises)
            .then(() => {
                resolve(downloadURLs);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

  OeuvreLikeById(oeuvreId: string, likeType: 'like' | 'unlike'): void {
    this.OeuvreById(oeuvreId).subscribe(oeuvre => {
      if (!oeuvre) {
        console.error('Oeuvre not found!');
        return;
      }
      if (likeType === 'like') {
        console.error('Like');
        oeuvre.like++;
      } else {
        console.error('UnLike');
        oeuvre.like--;
      }
    });
  }
}