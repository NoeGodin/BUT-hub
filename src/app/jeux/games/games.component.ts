import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  constructor(private router: Router) {}

  playTetris(){
    this.router.navigateByUrl('jeux/tetris');
  }
}
