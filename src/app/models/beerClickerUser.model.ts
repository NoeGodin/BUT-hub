import { BigNumber } from 'bignumber.js';

export class BeerClickerUser {
  beers!: BigNumber;
  clickValue!: BigNumber;

  constructor(beers: BigNumber, clickValue: BigNumber) {
    this.beers = beers;
    this.clickValue = clickValue;
  }
}
