import { Routes } from '@angular/router';
import { OeuvreListComponent } from './oeuvre-list/oeuvre-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OeuvreSingleComponent } from './oeuvre-single/oeuvre-single.component';
import { OeuvreSuggestionComponent } from './oeuvre-suggestion/oeuvre-suggestion.component';

export const routes: Routes = [
    { path: 'galerie/:id', component: OeuvreSingleComponent},
    { path: 'galerie', component: OeuvreListComponent },
    { path: '', component: LandingPageComponent },
    { path: 'suggestion', component: OeuvreSuggestionComponent}
];

export class AppRoutingModule {}