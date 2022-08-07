import { initGarage } from './garage/garage';
import { addStyleHidden, initHeader } from './header/header';
import initWinners from './winners/winners';

export default function initApp(): void {
  initHeader();
  initGarage();
  initWinners();
  addStyleHidden();
}
