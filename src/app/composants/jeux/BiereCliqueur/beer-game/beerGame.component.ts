import { Component } from '@angular/core';
import { BeerClickerUser } from '../../../../models/beerClickerUser.model';
import { playerService } from '../../../../services/beerClickerUser.service';
import { BeerClickerComponent } from '../beer-clicker/beer-clicker.component';
import { BeerPassiveComponent } from '../beer-passive/beer-passive.component';
@Component({
  selector: 'app-beerGame',
  standalone: true,
  imports: [BeerClickerComponent, BeerPassiveComponent],
  providers: [playerService],
  templateUrl: './beerGame.component.html',
  styleUrl: './beerGame.component.scss',
})
export class BeerGameComponent {
  beerStats: BeerClickerUser;

  constructor(userService: playerService) {
    this.beerStats = userService.getUser();
  }
}
