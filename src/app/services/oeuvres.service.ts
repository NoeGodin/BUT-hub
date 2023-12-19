import { Injectable, inject } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OeuvresService {
  private firestore: Firestore = inject(Firestore);
  oeuvres$: Observable<Oeuvre[]>;

  constructor(){
    const oeuvresCollection = collection(this.firestore, 'oeuvres');
    this.oeuvres$ = collectionData(oeuvresCollection) as Observable<Oeuvre[]>;
  }

getAllOeuvres(): Oeuvre[] {
  return this.oeuvres$;
}
OeuvreById(oeuvreId: number): Oeuvre {
  const oeuvre = this.oeuvres$.find(oeuvre$ => oeuvre.id === oeuvreId);
  if (!oeuvre) {
    throw new Error('FaceSnap not found!');
} else {
    return oeuvre;
}
}
OeuvreLikeById(faceSnapId: number, likeType: 'like' | 'unlike'): void {
  const oeuvre = this.OeuvreById(faceSnapId);
  likeType === 'like' ? oeuvre.like++ : oeuvre.like--;
}
}