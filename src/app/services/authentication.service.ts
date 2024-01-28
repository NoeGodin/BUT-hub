import { inject } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { from, Observable, Subscription } from 'rxjs';
import { sendPasswordResetEmail } from 'firebase/auth';

export class AuthenticationService {
  auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription!: Subscription;
  redirectUrl: string | null = null;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
    })
  }

  cancelUserSub() {
    this.userSubscription.unsubscribe()
  }

  signIn(email:string,password:string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  register(email:string,password:string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  recoverPassword(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  isLogged(): Promise<boolean> {
    return new Promise((resolve) => {
      const currentUser = this.auth.onAuthStateChanged(function(user) {
        if (user) {
          resolve(!!currentUser);
          console.log("user is signed in");
        } else {
          console.log("no user is signed in");
        }
      });
    });
  }
  
  getUserId(): Promise<string | null> {
    return new Promise((resolve) => {
      const currentUser = this.auth.currentUser;
      resolve(currentUser ? currentUser.uid : null);
    });
  }
  
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  }

}
