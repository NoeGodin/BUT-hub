import { AfterViewInit, Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Oeuvre } from '../../models/oeuvre.model';
import { OeuvreComponent } from "../oeuvre/oeuvre.component";
import { OeuvresService } from '../../services/oeuvres.service';
import { CommonModule } from '@angular/common';
import { Router  } from '@angular/router';
import { ScrollPositionService } from '../../services/oeuvres.scroll.service';

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

  constructor(
    private oeuvresService: OeuvresService,
    private router: Router,
    private scrollPositionService: ScrollPositionService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.oeuvresService.getAllOeuvres().subscribe(oeuvres => {
      this.oeuvres = oeuvres;
      this.trierParTitre();

      const lastOeuvreClicked = this.scrollPositionService.getLastOeuvreClicked();
      if (lastOeuvreClicked != null) {
        setTimeout(() => {
          this.scrollIntoView(lastOeuvreClicked);
        });
      }
    });
  }

  private scrollIntoView(oeuvreId: string): void {
    const element = document.getElementById(`oeuvre-${oeuvreId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy(): void {
    this.router.events.subscribe().unsubscribe();
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

  getJson():void{
    this.oeuvresService.getJson().subscribe(jsonString => {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'oeuvres.json';
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}
