import { Injectable, inject } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { CollectionReference, Firestore, collectionData, doc } from '@angular/fire/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class OeuvresService {
  private firestore: Firestore = inject(Firestore);
  private storage: Storage = inject(Storage);
  oeuvres$: Observable<Oeuvre[]>;

  constructor() {
    const oeuvresCollection = collection(this.firestore, 'oeuvres');
    this.oeuvres$ = collectionData(oeuvresCollection,{ idField: 'id' }) as Observable<Oeuvre[]>;

  }

  getAllOeuvres(): Observable<Oeuvre[]> {
    return this.oeuvres$;
  }

  OeuvreById(oeuvreId: string): Observable<Oeuvre | undefined> {
    return this.oeuvres$.pipe(
      map(oeuvres => oeuvres.find(oeuvre => oeuvre.id === oeuvreId))
    );
  }

  addOeuvre(oeuvre: Oeuvre) {
    const placeRef = collection(this.firestore, 'oeuvres');

  // Convert Oeuvre object to plain JavaScript object
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

  saveOeuvre(input: HTMLInputElement):string {
    if (!input.files) return "";

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, file.name);
            uploadBytesResumable(storageRef, file);
        }
    }
    return "fait"
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