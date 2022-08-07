import ElementBuilder from '../../controllers/element-builder';
import templateWinners from './template';
import { getWinners } from '../../controllers/api-services/winners';
import { Winners } from '../../models/winners.interface';
import { getCar } from '../../controllers/api-services/garage';
import { BaseObject } from '../../models/base.interface';
import { Car } from '../../models/car.interface';
import { Winner } from '../../models/winner.interface';
import templateTr from './tr-template';
import { Paginator, PaginatorInstance } from '../../models/paginator.interface';
import { SortingWinners } from '../../models/sortingWinners.interface';
import addPagination from '../pagination/pagination';

let currentPaginator: Paginator = {
  page: 1,
  limit: 10,
};

const currentSortingWinners: SortingWinners = {
  sort: 'id',
  order: 'ASC',
};

let winnersPaginator: PaginatorInstance;

function addArrowsSort(sortType: 'wins' | 'time' | 'id'): string {
  if (sortType !== currentSortingWinners.sort || currentSortingWinners.sort === 'id') {
    return '';
  }

  if (currentSortingWinners.sort === sortType) {
    return currentSortingWinners.order === 'ASC' ? '↑' : '↓';
  }

  return '';
}

export async function renderWinnersPage(paginator?: Paginator) {
  const blockWinners: HTMLElement = document.querySelector('.table__body') as HTMLElement;

  if (paginator) {
    currentPaginator = paginator;
  }

  const winners: Winners = await getWinners({
    ...currentPaginator,
    ...currentSortingWinners,
  });

  const arrayOfCars: Car[] = await Promise.all(winners.items
    .map((winner: Winner) => getCar(winner.id)));

  const arrayOfWinners: BaseObject[] = arrayOfCars.map((car: Car, index: number) => ({
    ...car,
    ...winners.items.find((win) => win.id === car.id),
    number: index + 1,
  }));

  const stringOfWinners: string = arrayOfWinners.map((winner: BaseObject) => templateTr(winner)).join('');
  const tableWinsOrder: HTMLElement = document.querySelector('.table__wins_order') as HTMLElement;
  const tableTimeOrder: HTMLElement = document.querySelector('.table__time_order') as HTMLElement;

  tableWinsOrder.textContent = addArrowsSort('wins');
  tableTimeOrder.textContent = addArrowsSort('time');

  const winnersTotalCount: HTMLElement = document.querySelector('.winners__carsTotal') as HTMLElement;

  blockWinners.innerHTML = stringOfWinners;

  winnersTotalCount.textContent = winners.total.toString();

  currentPaginator.total = Math.ceil(winners.total / currentPaginator.limit);
  winnersPaginator.update(currentPaginator);
}

function setSorting(eventTarget: HTMLElement, sortType: 'wins' | 'time') {
  if (eventTarget.dataset.sort === sortType) {
    if (currentSortingWinners.sort !== sortType) {
      currentSortingWinners.sort = sortType;
      currentSortingWinners.order = 'ASC';
    } else {
      currentSortingWinners.order = currentSortingWinners.order === 'ASC' ? 'DESC' : 'ASC';
    }
  }
}

export function sortingWinners(): void {
  document.addEventListener('click', (event: MouseEvent) => {
    const eventTarget: HTMLElement = event.target as HTMLElement;
    const elemTarget: HTMLElement = eventTarget?.classList?.contains('sort')
      ? eventTarget
      : eventTarget.closest('.sort') as HTMLElement;

    if (!elemTarget) {
      return;
    }

    setSorting(elemTarget, 'wins');
    setSorting(elemTarget, 'time');

    renderWinnersPage({ page: 1, limit: 10 });
  });
}

export default function initWinners(): void {
  const elementWinners: HTMLElement = ElementBuilder
    .buildElement(templateWinners({}));

  document.body.append(elementWinners);

  winnersPaginator = addPagination('.winners', currentPaginator, renderWinnersPage);
  renderWinnersPage(currentPaginator);
  sortingWinners();
}
