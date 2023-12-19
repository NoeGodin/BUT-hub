import { Injectable, inject } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { CollectionReference, Firestore, collectionData, doc } from '@angular/fire/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OeuvresService {
  private firestore: Firestore = inject(Firestore);
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

  addPlace(oeuvre: Oeuvre) {
    const placeRef = collection(this.firestore, 'oeuvres');
    return addDoc(placeRef, oeuvre);
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