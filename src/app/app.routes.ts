import { Routes } from '@angular/router';
import { OeuvreListComponent } from './galerie/oeuvre-list/oeuvre-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OeuvreSingleComponent } from './galerie/oeuvre-single/oeuvre-single.component';
import { OeuvreSuggestionComponent } from './galerie/oeuvre-suggestion/oeuvre-suggestion.component';
import { GamesComponent } from './jeux/games/games.component';
import { TetrisComponent } from './jeux/tetris/tetris.component';

export const routes: Routes = [
    { path: 'galerie/:id', component: OeuvreSingleComponent},
    { path: 'galerie', component: OeuvreListComponent },
    { path: '', component: LandingPageComponent },
    { path: 'suggestion', component: OeuvreSuggestionComponent},
    { path: 'jeux', component: GamesComponent},
    { path: 'jeux/tetris', component: TetrisComponent},

];

export class AppRoutingModule {}