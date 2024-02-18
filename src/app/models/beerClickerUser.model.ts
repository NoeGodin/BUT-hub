import { BigNumber } from 'bignumber.js';

export class BeerClickerUser {
  userName!: string;
  beers!: BigNumber;
  ClickValue!: BigNumber;

  constructor(name: string, beers: BigNumber, clickValue: BigNumber) {
    this.userName = name;
    this.beers = beers;
    this.ClickValue = clickValue;
  }
}
