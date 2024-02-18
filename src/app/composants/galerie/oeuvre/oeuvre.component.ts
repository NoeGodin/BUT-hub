import { Component, Input, OnInit } from '@angular/core';
import { Oeuvre } from '../../../models/oeuvre.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OeuvresService } from '../../../services/oeuvres.service';

@Component({
  selector: 'app-oeuvre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oeuvre.component.html',
  styleUrl: './oeuvre.component.scss',
})
export class OeuvreComponent implements OnInit {
  @Input() oeuvre!: Oeuvre;
  buttonText!: string;
  likeStatus!: boolean;

  constructor(private oeuvresService: OeuvresService, private route: Router) {}

  ngOnInit() {
    this.likeStatus = this.oeuvresService.isLikedOeuvreFromLocalSorage(
      this.oeuvre.id
    );
  }

  onViewOeuvre() {
    this.route.navigateByUrl(`galerie/${this.oeuvre.id}`);
  }
}
function isLikedOeuvreFromLocalSorage(id: string) {
  throw new Error('Function not implemented.');
}
