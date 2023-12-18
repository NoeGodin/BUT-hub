import { Routes } from '@angular/router';
import { OeuvreListComponent } from './oeuvre-list/oeuvre-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OeuvreSingleComponent } from './oeuvre-single/oeuvre-single.component';

export const routes: Routes = [
    { path: 'galerie/:id', component: OeuvreSingleComponent},
    { path: 'galerie', component: OeuvreListComponent },
    { path: '', component: LandingPageComponent }
];

export class AppRoutingModule {}