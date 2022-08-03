import ElementBuilder from '../../controllers/element-builder';
import { templateWinners } from './template';
import { getWinners } from '../../controllers/api-services/winners';
import { Winners } from '../../models/winners.interface';
import { getCar } from '../../controllers/api-services/garage';
import { BaseObject } from '../../models/base.interface';
import { Car } from '../../models/car.interface';
import { Winner } from '../../models/winner.interface';
import { templateTr } from './tr-template';

export default function initWinners(): void {
  async function renderWinnersPage() {
    const winners: Winners = await getWinners({
      _page: 1,
      _limit: 10,
      _sort: 'wins',
      _order: 'ASC',
    });

    const arrayOfCars: Car[] = await Promise.all(winners.items
      .map((winner: Winner) => getCar(winner.id)));

    const arrayOfWinners: BaseObject[] = arrayOfCars.map((car: Car, index: number) => ({
      ...car,
      ...winners.items.find((win) => win.id === car.id),
      number: index + 1,
    }));

    const stingOfWinners: string = arrayOfWinners.map((winner: BaseObject) => templateTr(winner)).join('');

    const elementWinners: HTMLElement = ElementBuilder
      .buildElement(templateWinners({ trTemplate: stingOfWinners }));

    document.body.append(elementWinners);
  }

  renderWinnersPage();
}
