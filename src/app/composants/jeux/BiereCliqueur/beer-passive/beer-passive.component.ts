import { Component } from '@angular/core';
import { playerService } from '../../../../services/beerClickerUser.service';
import { CommonModule } from '@angular/common';
import { Beer } from '../../../../models/beer.model';
import { BeerService } from '../../../../services/beer.service';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-beer-passive',
  standalone: true,
  imports: [CommonModule],
  providers: [BeerService],
  templateUrl: './beer-passive.component.html',
  styleUrl: './beer-passive.component.scss',
})
export class BeerPassiveComponent {
  beersAvailable: Beer[] = [];
  beersOnCounter: Beer[] = [];
  selectedBeers: Beer[] = [];
  valeurPassive: number = 0;

  constructor(
    private userService: playerService,
    private beerService: BeerService
  ) {
    this.beersOnCounter = this.beerService.getBeerCounter();
    this.beersAvailable = this.beerService.getAvailableBeers();
    this.calculatePassiveValue();
  }
  mixedBeer: string = '';

  calculatePassiveValue(): void {
    this.valeurPassive = 0;
    for (const beer of this.beersOnCounter) {
      this.valeurPassive += beer.value.toNumber();
    }
  }

  addBeerToCounter(beer: Beer) {
    if (!this.canBuyMoreBeer()) {
      return;
    }
    this.beerService.addBeerToCounter(beer, 'buy');
    this.calculatePassiveValue();
  }

  isAffordable(cost: BigNumber): boolean {
    return this.userService.user.beers.isGreaterThanOrEqualTo(cost);
  }

  canBuyMoreBeer(): boolean {
    return this.beersOnCounter.length < 5;
  }

  removeBeerFromCounter(index: number, type: 'mix' | 'sell') {
    this.beerService.removeBeerFromCounter(index, type);
    this.calculatePassiveValue();
  }

  toggleBeerSelection(beer: Beer) {
    if (this.isSelected(beer)) {
      this.selectedBeers = this.selectedBeers.filter((b) => b !== beer);
    } else if (this.selectedBeers.length < 2) {
      this.selectedBeers.push(beer);
    }
  }

  isSelected(beer: Beer): boolean {
    return this.selectedBeers.includes(beer);
  }

  mixBeers() {
    if (
      this.beerService.mixBeers(this.selectedBeers[0], this.selectedBeers[1])
    ) {
      this.selectedBeers = [];
      this.calculatePassiveValue();
    }
  }
}
