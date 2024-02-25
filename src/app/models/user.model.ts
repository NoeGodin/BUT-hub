import { Beer } from './beer.model';
import { BeerClickerUser } from './beerClickerUser.model';

export class User {
  games!: {
    tetris: {
      level: number;
      lignes: number;
      score: number;
    };
    beerClicker: {
      beerUser: BeerClickerUser;
      beers: Beer[];
    };
  };
  id: string;
  pseudo: string;

  constructor(id: string, pseudo: string) {
    this.id = id;
    this.pseudo = pseudo;
  }
}
