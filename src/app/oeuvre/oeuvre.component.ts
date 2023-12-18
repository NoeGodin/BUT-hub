import { Component, Input } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';

@Component({
  selector: 'app-oeuvre',
  standalone: true,
  imports: [],
  templateUrl: './oeuvre.component.html',
  styleUrl: './oeuvre.component.scss'
})
export class OeuvreComponent {
  @Input() oeuvre: Oeuvre;
  buttonText: string;

  onLike() {
    if (this.buttonText === 'Oh Snap!') {
      this.snaps++;
      this.buttonText = 'Oops, unSnap!';
    } else {
      this.snaps--;
      this.buttonText = 'Oh Snap!';
    }
  }
}
