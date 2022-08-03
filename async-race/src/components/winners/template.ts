import ElementBuilder from '../../controllers/element-builder';

export const templateWinners = ElementBuilder.buildTemplate`
  <div class="winners hidden">
    <div class="winners__wrapper wrapper">
    <h2 class="heading">winners (<span class="winners__carsTotal"></span>)</h2>
    <table class="winners__table">
    <thead>
        <tr>
            <th>№</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (sec)</th>
        </tr>
    </thead>
    <tbody>
      ${'trTemplate'}
    </tbody>
</table>
</div>
  </div>`;
