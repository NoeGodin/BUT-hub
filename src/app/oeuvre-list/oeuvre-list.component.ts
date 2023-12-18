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
  
  constructor(private oeuvresService: OeuvresService) { }

  ngOnInit(): void {
    this.oeuvres = this.oeuvresService.getAllOeuvres();
  } 

}
