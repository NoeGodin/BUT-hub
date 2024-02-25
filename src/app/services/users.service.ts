import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import BigNumber from 'bignumber.js';
import { Beer } from '../models/beer.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userInfo$: Observable<User[]>;

  constructor(private firestore: Firestore) {
    const usersCollection = collection(this.firestore, 'users');
    this.userInfo$ = collectionData(usersCollection, {
      idField: 'id',
    }) as Observable<User[]>;
  }

  UserById(userId: string): Observable<User | undefined> {
    return this.userInfo$.pipe(
      map((userInfo) => userInfo.find((user) => user.id === userId)),
      map((user) => {
        if (user) {
          user.games.beerClicker.beers = user.games.beerClicker.beers.map(
            (beer: any) => {
              return new Beer(
                beer.name,
                new BigNumber(beer.value),
                new BigNumber(beer.cost)
              );
            }
          );
          user.games.beerClicker.beerUser.beers = new BigNumber(
            user.games.beerClicker.beerUser.beers
          );
          user.games.beerClicker.beerUser.clickValue = new BigNumber(
            user.games.beerClicker.beerUser.clickValue
          );
        }
        return user;
      })
    );
  }
}
