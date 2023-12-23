import { Component } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { OeuvresService } from '../services/oeuvres.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-oeuvre-suggestion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './oeuvre-suggestion.component.html',
  styleUrl: './oeuvre-suggestion.component.scss'
})
export class OeuvreSuggestionComponent {
  nouvelleOeuvre: Oeuvre = new Oeuvre();
  selectedImage: string | null = null;

  constructor(private oeuvresService: OeuvresService) {}

  ajouterOeuvre(): void {
    console.log("bouton presse");
    this.oeuvresService.addOeuvre(this.nouvelleOeuvre);
    this.nouvelleOeuvre = new Oeuvre();
    this.selectedImage = null;
  }

  saveImage(input: HTMLInputElement): void {
    this.selectedImage = this.oeuvresService.saveOeuvre(input)
  }
}
