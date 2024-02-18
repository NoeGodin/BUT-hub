import { Component } from '@angular/core';
import { Oeuvre } from '../../../models/oeuvre.model';
import { OeuvresService } from '../../../services/oeuvres.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oeuvre-suggestion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './oeuvre-suggestion.component.html',
  styleUrl: './oeuvre-suggestion.component.scss',
})
export class OeuvreSuggestionComponent {
  nouvelleOeuvre: Oeuvre = new Oeuvre();
  selectedFile: HTMLInputElement | undefined;
  fileStatus: string | undefined;

  constructor(private oeuvresService: OeuvresService) {}

  ajouterOeuvre(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    this.oeuvresService
      .uploadFile(this.selectedFile)
      .then((downloadURLs) => {
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
      const file = inputElement.files[0];
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxSize = 8 * 1024 * 1024;
      if (!allowedTypes.includes(file.type)) {
        this.fileStatus = "Ce type de fichier n'est pas autorisé";
        this.selectedFile = undefined;
        return;
      }
      if (file.size > maxSize) {
        this.fileStatus = 'Ce fichier est trop lourd';
        this.selectedFile = undefined;
        return;
      }
      this.selectedFile = inputElement;
      this.fileStatus = '';
    }
  }

  onSubmit() {
    this.ajouterOeuvre();
  }
}
