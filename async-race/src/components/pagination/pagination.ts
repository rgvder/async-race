import { Paginator } from '../../models/paginator.interface';

let currentPaginator: Paginator;

export function addPagination(defaultPaginator: Paginator, renderPage: (paginator: Paginator) => void): void {
  currentPaginator = defaultPaginator;

  const buttonPrev: HTMLButtonElement = document.querySelector('.button-prev') as HTMLButtonElement;
  const buttonNext: HTMLButtonElement = document.querySelector('.button-next') as HTMLButtonElement;

  buttonPrev.addEventListener('click', () => {
    currentPaginator.page -= 1;
    renderPage(currentPaginator);
  });

  buttonNext.addEventListener('click', () => {
    currentPaginator.page += 1;
    renderPage(currentPaginator);
  });
}

export function updatePagination(paginator: Paginator) {
  const buttonPrev: HTMLButtonElement = document.querySelector('.button-prev') as HTMLButtonElement;
  const buttonNext: HTMLButtonElement = document.querySelector('.button-next') as HTMLButtonElement;
  const pageCount: HTMLElement = document.querySelector('.pagination__page') as HTMLElement;

  currentPaginator = paginator;
  pageCount.innerText = currentPaginator.page.toString();

  buttonPrev.toggleAttribute('disabled', currentPaginator.page <= 1);
  buttonNext.toggleAttribute('disabled', !currentPaginator.total || (currentPaginator.page === currentPaginator.total));
}
