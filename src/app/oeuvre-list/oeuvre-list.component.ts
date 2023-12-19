import { Component, OnInit } from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { OeuvreComponent } from "../oeuvre/oeuvre.component";
import { OeuvresService } from '../services/oeuvres.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-oeuvre-list',
    standalone: true,
    templateUrl: './oeuvre-list.component.html',
    styleUrl: './oeuvre-list.component.scss',
    imports: [OeuvreComponent,CommonModule]
})
export class OeuvreListComponent implements OnInit{
  oeuvres !: Oeuvre[];
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private oeuvresService: OeuvresService) { }

  ngOnInit(): void {
    this.oeuvresService.getAllOeuvres().subscribe(oeuvres => {
      this.oeuvres = oeuvres;
      this.trierParNomDeFamille();
    })
  }

  trierParNomDeFamille(): void {
    this.oeuvres.sort((a, b) => {
      const nomA = this.getNomDeFamille(a.auteur);
      const nomB = this.getNomDeFamille(b.auteur);

      // Comparaison des noms de famille
      return nomA.localeCompare(nomB);
    });
  }

  getNomDeFamille(auteur: string): string {
    // Récupération du nom de famille (partie après l'espace)
    const nomComplet = auteur.split(' ');
    return nomComplet.length > 1 ? nomComplet[nomComplet.length - 1] : auteur;
  }

  naviguerVersLettre(lettre: string): void {
    const lettreMinuscule = lettre.toLowerCase();
    const section = document.getElementById(lettreMinuscule);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
