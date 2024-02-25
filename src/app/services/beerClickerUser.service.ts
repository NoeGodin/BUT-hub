import BigNumber from 'bignumber.js';
import { BeerClickerUser } from '../models/beerClickerUser.model';
import { UsersService } from './users.service';
import { AuthenticationService } from './authentication.service';

import { Injectable } from '@angular/core';
@Injectable()
export class beerClickerUser {
  user: BeerClickerUser;
  coutAmelioration: BigNumber;

  constructor(
    private userService: UsersService,
    private authenticationService: AuthenticationService
  ) {
    this.user = { beers: new BigNumber(0), clickValue: new BigNumber(1) };
    this.coutAmelioration = this.user.clickValue.times(100);
    this.initUser();
  }

  async initUser() {
    if (await this.authenticationService.isLogged()) {
      const userId = await this.authenticationService.getUserId();
      if (userId == null) {
        console.log('bug curieux mdr');
      } else {
        this.userService.UserById(userId).subscribe((user) => {
          if (user) {
            Object.assign(this.user, user.games.beerClicker.beerUser);
            this.coutAmelioration = this.user.clickValue.times(100);
            console.log(this.user);
          }
        });
      }
    }
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
    this.changeBeerNumber(this.user.clickValue);
  }
  isAffordable(cost: BigNumber): boolean {
    return this.user.beers.isGreaterThanOrEqualTo(cost);
  }
  upgradeClickValue() {
    if (!this.isAffordable(this.clickUpgradeCost())) return;
    this.changeBeerNumber(this.clickUpgradeCost().negated());
    this.user.clickValue = this.user.clickValue.times(2);
  }
  clickUpgradeCost(): BigNumber {
    return this.coutAmelioration;
  }
}
