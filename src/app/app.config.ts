import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

export const firebaseConfig = {
  apiKey: process.env['FIREBASE_API_KEY'] as string,
  authDomain: process.env['FIREBASE_AUTH_DOMAIN'] as string,
  projectId: process.env['FIREBASE_PROJECT_ID'] as string,
  storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] as string,
  messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'] as string,
  appId: process.env['FIREBASE_APP_ID'] as string,
  measurementId: process.env['FIREBASE_MEASUREMENT_ID'] as string
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ]
};
