import { Component, OnInit } from '@angular/core';
import { Oeuvre } from '../../models/oeuvre.model';
import { OeuvreComponent } from "../oeuvre/oeuvre.component";
import { OeuvresService } from '../../services/oeuvres.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private oeuvresService: OeuvresService,private router: Router) { }

  ngOnInit(): void {
    this.oeuvresService.getAllOeuvres().subscribe(oeuvres => {
      console.log("oeuvres",oeuvres)
      this.oeuvres = oeuvres;
      this.trierParTitre();
    })
  }

  trierParTitre(): void {
    this.oeuvres.sort((a, b) => a.titre.localeCompare(b.titre));
  }

  naviguerVersLettre(lettre: string): void {
    const lettreMinuscule = lettre.toLowerCase();
    const section = document.getElementById(lettreMinuscule);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ouvrirFormulaire(): void {
    this.router.navigateByUrl('suggestion');
  }

}
