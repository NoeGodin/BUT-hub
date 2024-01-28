import { Injectable, inject } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { Firestore, collectionData, doc, } from '@angular/fire/firestore';
import { addDoc, collection, increment, updateDoc } from 'firebase/firestore';
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
    return this.oeuvres$;
  }

  getJson(): Observable<string> {
    return this.oeuvres$.pipe(
      map(oeuvres => {
        const jsonResult = {
          oeuvres: {} as { [id: string]: Oeuvre }
        };

        for (const oeuvre of oeuvres) {
          jsonResult.oeuvres[oeuvre.id] = {
            id: oeuvre.id,
            titre: oeuvre.titre,
            auteur: oeuvre.auteur,
            imageUrl: oeuvre.imageUrl,
            description: oeuvre.description,
            date: oeuvre.date,
            courant: oeuvre.courant,
            like: oeuvre.like
          };
        }

        const jsonString = JSON.stringify(jsonResult, null, 2);
        return jsonString;
      })
    );
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

  OeuvreLikeById(oeuvreId: string, likeType: 'like' | 'unlike') {
    const oeuvreRef = doc(this.firestore, 'oeuvres', oeuvreId)

    if (likeType === 'like') {
      updateDoc(oeuvreRef, { like: increment(1)});
    } else {
      updateDoc(oeuvreRef, { like: increment(-1)});
    }
  }

  getLikedOeuvresFromLocalStorage(): string[] {
    const likedOeuvres = localStorage.getItem('likedOeuvres');
    return likedOeuvres ? JSON.parse(likedOeuvres) : [];
  }

  isLikedOeuvreFromLocalSorage(oeuvreId:string): boolean{
    const likedOeuvres = this.getLikedOeuvresFromLocalStorage();
    return likedOeuvres.includes(oeuvreId);
  }
}