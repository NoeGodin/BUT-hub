import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { map } from 'rxjs/operators';
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userInfo$: Observable<User[]>;

  constructor(private firestore: Firestore) {
    const usersCollection = collection(this.firestore, 'users');
    this.userInfo$ = collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  UserById(userId: string): Observable<User | undefined> {
    return this.userInfo$.pipe(
      map(userInfo => userInfo.find(user => user.id === userId))
    );
  }
}