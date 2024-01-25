import { Component, Input, OnInit} from '@angular/core';
import { Oeuvre } from '../models/oeuvre.model';
import { CommonModule } from '@angular/common';
import { OeuvresService } from '../services/oeuvres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oeuvre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oeuvre.component.html',
  styleUrl: './oeuvre.component.scss'
})
export class OeuvreComponent implements OnInit {
  @Input() oeuvre!: Oeuvre;
  buttonText!: string;

  constructor(private oeuvresService: OeuvresService,private route: Router) {}

  ngOnInit(){

    console.log("oeuvre",this.oeuvre.titre)
  }

  onViewOeuvre() {
    this.route.navigateByUrl(`galerie/${this.oeuvre.id}`);
  }
}
