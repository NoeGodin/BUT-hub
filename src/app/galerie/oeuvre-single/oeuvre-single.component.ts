import { Component, OnInit } from '@angular/core';
import { Oeuvre } from '../../models/oeuvre.model';
import { OeuvresService } from '../../services/oeuvres.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-oeuvre-single',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './oeuvre-single.component.html',
  styleUrl: './oeuvre-single.component.scss'
})
export class OeuvreSingleComponent implements OnInit {
  oeuvre!: Oeuvre;
  buttonText!: string;

  constructor(private oeuvresService: OeuvresService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buttonText = "J'aime !";
    const oeuvreId = this.route.snapshot.params['id'];
    console.log("id de l'oeuvre cliqué :"+oeuvreId);
    this.oeuvresService.OeuvreById(oeuvreId).subscribe(oeuvre => {
      if (!oeuvre) {
        console.error('Oeuvre not found!');
        return;
      }
  
      this.oeuvre = oeuvre;
    });
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

}
