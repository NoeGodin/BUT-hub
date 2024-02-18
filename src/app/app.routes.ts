import { Routes } from '@angular/router';
import { OeuvreListComponent } from './composants/galerie/oeuvre-list/oeuvre-list.component';
import { LandingPageComponent } from './composants/landing-page/landing-page.component';
import { OeuvreSingleComponent } from './composants/galerie/oeuvre-single/oeuvre-single.component';
import { OeuvreSuggestionComponent } from './composants/galerie/oeuvre-suggestion/oeuvre-suggestion.component';
import { GamesComponent } from './composants/jeux/games/games.component';
import { TetrisComponent } from './composants/jeux/tetris/tetris.component';
import { BeerGameComponent } from './composants/jeux/BiereCliqueur/beer-game/beerGame.component';
import { ConnexionComponent } from './composants/connexion/connexion.component';

export const routes: Routes = [
  { path: 'galerie/:id', component: OeuvreSingleComponent },
  { path: 'galerie', component: OeuvreListComponent },
  { path: '', component: LandingPageComponent },
  { path: 'suggestion', component: OeuvreSuggestionComponent },
  { path: 'jeux', component: GamesComponent },
  { path: 'jeux/tetris', component: TetrisComponent },
  { path: 'jeux/biere', component: BeerGameComponent },
  { path: 'login', component: ConnexionComponent },
];

export class AppRoutingModule {}
