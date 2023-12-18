import { Injectable } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';

@Injectable({
  providedIn: 'root'
})
export class OeuvresService {
  oeuvres: Oeuvre[] = [
    {
      id: 0,
      titre: 'Archibald',
      description: 'Mon meilleur ami depuis tout petit !',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      date: new Date(),
      like: 0,
      courant: 'Paris',
      auteur: 'Noé'
    },
    {
      id: 1,
      titre: 'Three Rock Mountain',
      description: 'Un endroit magnifique pour les randonnées.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
      date: new Date(),
      like: 0,
      courant: 'Paris',
      auteur: 'Noé'
    },
]
getAllOeuvres(): Oeuvre[] {
  return this.oeuvres;
}
OeuvreById(oeuvreId: number): Oeuvre {
  const oeuvre = this.oeuvres.find(oeuvre => oeuvre.id === oeuvreId);
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