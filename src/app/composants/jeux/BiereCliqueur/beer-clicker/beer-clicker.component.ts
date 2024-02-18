import { Component, ViewEncapsulation } from '@angular/core';
import { playerService } from '../../../../services/beerClickerUser.service';
import { CommonModule } from '@angular/common';
import { BeerService } from '../../../../services/beer.service';
import { BeerClickerUser } from '../../../../models/beerClickerUser.model';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-beer-clicker',
  standalone: true,
  imports: [CommonModule],
  providers: [BeerService],
  templateUrl: './beer-clicker.component.html',
  styleUrl: './beer-clicker.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BeerClickerComponent {
  user: BeerClickerUser;
  coutAmelioration: BigNumber;
  beerImages: HTMLImageElement[] = [];
  constructor(private userService: playerService) {
    this.user = userService.getUser();
    this.coutAmelioration = userService.clickUpgradeCost();

    for (let i = 1; i <= 5; i++) {
      const image = document.createElement('img');
      image.src = `../../assets/beer${i}.png`;
      image.classList.add('beer');
      this.beerImages.push(image);
    }
  }
  moreBeers() {
    this.userService.beerClick();
  }
  upgradeClickValue() {
    this.userService.upgradeClickValue();
    this.coutAmelioration = this.userService.clickUpgradeCost();
  }
  isAffordable(cost: BigNumber): boolean {
    return this.userService.isAffordable(cost);
  }

  bierreAnimation(event: MouseEvent) {
    const biereContainer = document.getElementById('counter');
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;

    if (!biereContainer) return;

    const randomBeerIndex = Math.floor(Math.random() * this.beerImages.length);
    const imageBiere = this.beerImages[
      randomBeerIndex
    ].cloneNode() as HTMLImageElement;

    const initialX = event.clientX;
    const initialY = event.clientY;
    imageBiere.style.left = initialX + 'px';
    imageBiere.style.top = initialY + 'px';

    const finalX = Math.random() * containerWidth - containerWidth / 5;
    const finalY = Math.random() * containerHeight - containerHeight / 5;

    const bierreAnimation = [
      {
        transform: 'rotate(0) scale(1)',
        left: initialX + 'px',
        top: initialY + 'px',
      },
      {
        transform: 'rotate(360deg) scale(0)',
        left: finalX + 'px',
        top: finalY + 'px',
      },
    ];

    const bierreTiming = { duration: 350, iterations: 1 };

    imageBiere
      .animate(bierreAnimation, bierreTiming)
      .addEventListener('finish', () => {
        imageBiere.remove();
      });

    biereContainer.appendChild(imageBiere);
  }
}
