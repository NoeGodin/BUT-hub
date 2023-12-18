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
    this.buttonText = "J'aime !";
  }

  onLike() {
    if (this.buttonText === "J'aime !") {
        this.oeuvresService.OeuvreLikeById(this.oeuvre.id,"like");
        this.buttonText = "Je n'aime pas";
    } else {
        this.oeuvresService.OeuvreLikeById(this.oeuvre.id,"unlike");
        this.buttonText = "J'aime !";
    }
  }

  onViewOeuvre() {
    this.route.navigateByUrl(`galerie/${this.oeuvre.id}`);
  }
}
