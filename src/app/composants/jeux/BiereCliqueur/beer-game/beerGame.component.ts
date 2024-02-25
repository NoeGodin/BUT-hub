import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerClickerUser } from '../../../../models/beerClickerUser.model';
import { beerClickerUser } from '../../../../services/beerClickerUser.service';
import { BeerClickerComponent } from '../beer-clicker/beer-clicker.component';
import { BeerPassiveComponent } from '../beer-passive/beer-passive.component';
@Component({
  selector: 'app-beerGame',
  standalone: true,
  imports: [BeerClickerComponent, BeerPassiveComponent, CommonModule],
  providers: [beerClickerUser],
  templateUrl: './beerGame.component.html',
  styleUrl: './beerGame.component.scss',
})
export class BeerGameComponent implements OnDestroy {
  beerStats: BeerClickerUser;

  constructor(beerClickerUser: beerClickerUser) {
    this.beerStats = beerClickerUser.getUser();
  }

  ngOnDestroy() {}
}
