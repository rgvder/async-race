import ElementBuilder from '../../controllers/element-builder';

const templateWinners = ElementBuilder.buildTemplate`
  <div class="winners hidden">
    <div class="winners__wrapper wrapper">
      <h2 class="heading">WINNERS (<span class="winners__carsTotal"></span>)</h2>
      <table class="winners__table table">
        <thead>
          <tr>
            <th class="table__number">№</th>
            <th>Car</th>
            <th class="table__name">Name</th>
            <th class="table__wins sort" data-sort="wins">
              <div class="table__wins">
                <span>Wins</span>
                <span class="table__wins_order"></span>
              </div>
            </th>
            <th class="table__time sort" data-sort="time">
              <div class="table__time">
                <span>Best time (sec)</span>
                <span class="table__time_order"></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          ${'trTemplate'}
        </tbody>
      </table>
      <div class="winners__pagination pagination">
        <button class="button button-basic button-prev">Prev</button>
        <span class="pagination__page">${'pageCount'}</span>
        <button class="button button-basic button-next">Next</button>
      </div>
    </div>
  </div>`;

export default templateWinners;
