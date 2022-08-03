import { initGarage } from './garage/garage';
import { addStyleHidden, initHeader } from './header/header';
import initWinners from './winners/winners';

export default class App {
  public initApp(): void {
    initHeader();
    initGarage();
    initWinners();
    addStyleHidden();
  }
}
