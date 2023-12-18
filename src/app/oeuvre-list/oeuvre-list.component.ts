import { Component } from '@angular/core';

@Component({
  selector: 'app-oeuvre-list',
  standalone: true,
  imports: [],
  templateUrl: './oeuvre-list.component.html',
  styleUrl: './oeuvre-list.component.scss'
})
export class OeuvreListComponent {
  oeuvres : Oeuvre[];

}
