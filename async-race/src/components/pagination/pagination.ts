import { Paginator, PaginatorInstance } from '../../models/paginator.interface';
import { removeDisabled } from '../garage-options/garage-options';

export default function addPagination(
  selector: string,
  defaultPaginator: Paginator,
  renderPage: (paginator: Paginator) => void,
): PaginatorInstance {
  let currentPaginator: Paginator = defaultPaginator;

  const buttonPrev: HTMLButtonElement = document.querySelector(`${selector} .button-prev`) as HTMLButtonElement;
  const buttonNext: HTMLButtonElement = document.querySelector(`${selector} .button-next`) as HTMLButtonElement;

  buttonPrev.addEventListener('click', () => {
    currentPaginator.page -= 1;
    renderPage(currentPaginator);

    removeDisabled();
  });

  buttonNext.addEventListener('click', () => {
    currentPaginator.page += 1;
    renderPage(currentPaginator);

    removeDisabled();
  });

  function updatePagination(paginator: Paginator): void {
    const pageCount: HTMLElement = document.querySelector(`${selector} .pagination__page`) as HTMLElement;

    currentPaginator = paginator;
    pageCount.innerText = currentPaginator.page.toString();

    buttonPrev.toggleAttribute('disabled', currentPaginator.page <= 1);
    buttonNext.toggleAttribute('disabled', !currentPaginator.total || (currentPaginator.page === currentPaginator.total));
  }

  return { value: currentPaginator, update: updatePagination };
}
