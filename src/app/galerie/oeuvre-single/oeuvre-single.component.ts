import { Component, Input, OnInit } from '@angular/core';
import { Oeuvre } from '../../models/oeuvre.model';
import { OeuvresService } from '../../services/oeuvres.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { ScrollPositionService } from '../../services/oeuvres.scroll.service';


@Component({
  selector: 'app-oeuvre-single',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './oeuvre-single.component.html',
  styleUrl: './oeuvre-single.component.scss'
})
export class OeuvreSingleComponent implements OnInit {
  @Input() oeuvre!: Oeuvre;
  buttonText!: string;
  scrollPosition!: number;

  constructor(private oeuvresService: OeuvresService, private route: ActivatedRoute,private scrollPositionService: ScrollPositionService) {
  }

  ngOnInit(): void {
    const oeuvreId = this.route.snapshot.params['id'];
    const likedOeuvres = this.oeuvresService.getLikedOeuvresFromLocalStorage();
    this.buttonText = likedOeuvres.includes(oeuvreId) ? "Je n'aime plus" : "J'aime !";
    this.oeuvresService.OeuvreById(oeuvreId).subscribe(oeuvre => {
      if (!oeuvre) {
        console.error('Oeuvre not found!');
        return;
      }
      this.oeuvre = oeuvre;
    });
    this.scrollPositionService.setLastOeuvreClicked(oeuvreId);
  }

  onLike() {
    const oeuvreId = this.route.snapshot.params['id'];
    const likedOeuvres = this.oeuvresService.getLikedOeuvresFromLocalStorage();

    if (this.buttonText === "J'aime !") {
      likedOeuvres.push(oeuvreId);
      this.oeuvresService.OeuvreLikeById(oeuvreId, 'like');
      this.buttonText = "Je n'aime plus";
    } 
    else {
      const index = likedOeuvres.indexOf(oeuvreId);
      if (index !== -1) {
        likedOeuvres.splice(index, 1);
      }
      this.oeuvresService.OeuvreLikeById(oeuvreId, 'unlike');
      this.buttonText = "J'aime !";
    }
    localStorage.setItem('likedOeuvres', JSON.stringify(likedOeuvres));
  }

}
