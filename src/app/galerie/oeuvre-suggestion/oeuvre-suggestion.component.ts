import { Component } from '@angular/core';
import { Oeuvre } from '../../models/oeuvre.model';
import { OeuvresService } from '../../services/oeuvres.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-oeuvre-suggestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './oeuvre-suggestion.component.html',
  styleUrl: './oeuvre-suggestion.component.scss'
})

export class OeuvreSuggestionComponent {
  nouvelleOeuvre: Oeuvre = new Oeuvre();
  selectedFile: HTMLInputElement | undefined;

  constructor(private oeuvresService: OeuvresService) {}

  ajouterOeuvre(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    this.oeuvresService.uploadFile(this.selectedFile)
      .then((downloadURLs) => {
        console.log('Liens de téléchargement :', downloadURLs[0]);
        this.nouvelleOeuvre.imageUrl = downloadURLs[0];
        this.oeuvresService.addOeuvre(this.nouvelleOeuvre);
        this.nouvelleOeuvre = new Oeuvre();
        this.selectedFile = undefined;
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement des fichiers :', error);
      });
  }

  uploadFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement;
    } else {
      this.selectedFile = undefined;
    }
  }

  onSubmit() {
    this.ajouterOeuvre();
  }
}
