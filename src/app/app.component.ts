import { Component,LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OeuvreListComponent } from "./oeuvre-list/oeuvre-list.component";
import { HeaderComponent } from "./header/header.component";
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, OeuvreListComponent, HeaderComponent],
    providers:[{provide: LOCALE_ID,useValue: 'fr-FR'}]
})
export class AppComponent {
  title = 'Noé Dev';
  constructor() {
    registerLocaleData(fr.default);
  }
}
