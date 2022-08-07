import ElementBuilder from '../../controllers/element-builder';
import templateHeader from './template';
import { renderWinnersPage } from '../winners/winners';

export function initHeader(): void {
  const elementHeader: HTMLElement = ElementBuilder
    .buildElement(templateHeader({}));

  document.body.append(elementHeader);
}

export function addStyleHidden() {
  const buttonGarage: HTMLButtonElement = document.querySelector('.buttonGarage') as HTMLButtonElement;
  const buttonWinners: HTMLButtonElement = document.querySelector('.buttonWinners') as HTMLButtonElement;

  buttonGarage.addEventListener('click', () => {
    document.body.classList.remove('hidden');
  });

  buttonWinners.addEventListener('click', () => {
    document.body.classList.add('hidden');
    renderWinnersPage();
  });
}
