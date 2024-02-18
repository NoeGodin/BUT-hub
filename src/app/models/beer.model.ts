import { BigNumber } from 'bignumber.js';
declare type Timeout = ReturnType<typeof setTimeout>;
export class Beer {
  name!: string;
  value!: BigNumber;
  cost!: BigNumber;
  interval: Timeout | null = null;

  constructor(name: string, value: BigNumber, cost: BigNumber) {
    this.name = name;
    this.value = value;
    this.cost = cost;
  }

  startInterval(changeBeerNumber: (number: BigNumber) => void) {
    if (!this.interval) {
      this.interval = setInterval(() => {
        changeBeerNumber(this.value);
      }, 1000);
    }
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  clone() {
    return new Beer(this.name, this.value, this.cost);
  }
}
