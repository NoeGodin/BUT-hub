import BigNumber from 'bignumber.js';
import { BeerClickerUser } from '../models/beerClickerUser.model';

declare type Timeout = ReturnType<typeof setTimeout>;

export class playerService {
  user: BeerClickerUser;

  constructor() {
    this.user = new BeerClickerUser('Noé', BigNumber(0), BigNumber(5));
  }
  getUser(): BeerClickerUser {
    return this.user;
  }
  changeBeerNumber(number: BigNumber) {
    this.user.beers = this.user.beers
      .plus(number)
      .integerValue(BigNumber.ROUND_DOWN);
  }
  beerClick() {
    this.changeBeerNumber(this.user.ClickValue);
  }
  isAffordable(cost: BigNumber): boolean {
    return this.user.beers.isGreaterThanOrEqualTo(cost);
  }
  upgradeClickValue() {
    if (!this.isAffordable(this.clickUpgradeCost())) return;
    this.changeBeerNumber(this.clickUpgradeCost().negated());
    this.user.ClickValue = this.user.ClickValue.times(2);
  }
  clickUpgradeCost(): BigNumber {
    return this.user.ClickValue.times(100);
  }
}
