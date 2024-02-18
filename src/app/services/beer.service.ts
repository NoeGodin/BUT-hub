import BigNumber from 'bignumber.js';
import { playerService } from './beerClickerUser.service';
import { Beer } from '../models/beer.model';
import { Injectable } from '@angular/core';
@Injectable()
export class BeerService {
  beerCounter: Beer[] = [];
  availableBeers: Beer[] = [];
  allBeers: Beer[] = this.fetchBeerFactories();

  constructor(private playerService: playerService) {
    this.availableBeers.push(this.allBeers[0]);
  }

  fetchBeerFactories(): Beer[] {
    return [
      new Beer('Maximator : ⭐x1', BigNumber(2 ** 0), BigNumber(10 * 5 ** 0)),
      new Beer(
        'Kronenbourg : ⭐x2',
        BigNumber(2 ** 1 + 1),
        BigNumber(10 * 5 ** 1)
      ),
      new Beer('86 : ⭐x3', BigNumber(2 ** 2 + 1), BigNumber(10 * 5 ** 2)),
      new Beer(
        'Heineken : ⭐x4',
        BigNumber(2 ** 3 + 1),
        BigNumber(10 * 5 ** 3)
      ),
      new Beer(
        'Stella Ardois : ⭐x5',
        BigNumber(2 ** 4 + 1),
        BigNumber(10 * 5 ** 4)
      ),
      new Beer('Pilsner : ⭐x6', BigNumber(2 ** 5 + 1), BigNumber(10 * 5 ** 5)),
      new Beer(
        'Desperados : ⭐x7',
        BigNumber(2 ** 6 + 1),
        BigNumber(10 * 5 ** 6)
      ),
      new Beer('1664 : ⭐x8', BigNumber(2 ** 7 + 1), BigNumber(10 * 5 ** 7)),
      new Beer('Leffe : ⭐x9', BigNumber(2 ** 8 + 1), BigNumber(10 * 5 ** 8)),
      new Beer(
        'Goudale : ⭐x10',
        BigNumber(2 ** 9 + 1),
        BigNumber(10 * 5 ** 9)
      ),
      new Beer(
        'Guiness : ⭐x11',
        BigNumber(2 ** 10 + 1),
        BigNumber(10 * 5 ** 10)
      ),
      new Beer(
        'Chouffe : ⭐x12',
        BigNumber(2 ** 11 + 1),
        BigNumber(10 * 5 ** 11)
      ),
      new Beer(
        'Rince Cochon : ⭐x13',
        BigNumber(2 ** 12 + 1),
        BigNumber(10 * 5 ** 12 + 1)
      ),
      new Beer(
        'Corona : ⭐x14',
        BigNumber(2 ** 13 + 1),
        BigNumber(10 * 5 ** 13)
      ),
      new Beer(
        'Paix Dieu : ⭐x15',
        BigNumber(2 ** 14 + 1),
        BigNumber(10 * 5 ** 14 + 1)
      ),
      new Beer(
        'La bière après une dure journée : ⭐x999',
        BigNumber(2 ** 100 + 1),
        BigNumber(1)
      ),
    ];
  }

  getBeerCounter() {
    return this.beerCounter;
  }

  getAvailableBeers() {
    return this.availableBeers;
  }

  addBeerToCounter(beer: Beer, type: 'mix' | 'buy') {
    if (type == 'buy' && !this.isAffordable(beer.cost)) {
      return;
    }
    const newBeer = beer.clone();
    newBeer.startInterval(this.changeBeerNumber.bind(this));
    this.beerCounter.push(newBeer);
    if (type == 'buy') {
      this.playerService.changeBeerNumber(beer.cost.negated());
    }
  }

  removeBeerFromCounter(index: number, type: 'mix' | 'sell') {
    this.beerCounter[index].stopInterval();
    if (type == 'sell') {
      this.playerService.changeBeerNumber(
        this.beerCounter[index].cost.dividedBy(2)
      );
    }
    this.beerCounter.splice(index, 1);
  }

  mixBeers(beer1: Beer, beer2: Beer): boolean {
    if (beer1.name !== beer2.name) {
      return false;
    }
    const mixedBeer = this.allBeers.findIndex(
      (beer) => beer.name === beer1.name
    );
    if (mixedBeer === -1 || mixedBeer + 1 >= this.allBeers.length) {
      return false;
    }
    this.removeBeerFromCounter(this.beerCounter.indexOf(beer1), 'mix');
    this.removeBeerFromCounter(this.beerCounter.indexOf(beer2), 'mix');
    this.addBeerToCounter(this.allBeers[mixedBeer + 1], 'mix');
    if (
      mixedBeer - 1 > 0 &&
      this.availableBeers.indexOf(this.allBeers[mixedBeer - 1]) === -1
    ) {
      this.availableBeers.push(this.allBeers[mixedBeer - 1]);
    }
    return true;
  }

  private changeBeerNumber(number: BigNumber) {
    this.playerService.changeBeerNumber(number);
  }

  private isAffordable(cost: BigNumber): boolean {
    return this.playerService.isAffordable(cost);
  }
}
