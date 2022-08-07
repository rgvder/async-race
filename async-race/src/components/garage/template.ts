import ElementBuilder from '../../controllers/element-builder';

export const templateGarage = ElementBuilder.buildTemplate`
  <div class="garage">
    <div class="wrapper">
      <div class="garage__options">
        <div class="options">
        <div class="option create-car">
        <div class="option__wrapper">
            <input class="option__input option__input_text create-car__name" type="text">
            <input class="option__input option__input_color create-car__color" type="color" value="#fb00ff">
            </div>
            <button class="button button-additional option__button create-car__button">Create</button>
          </div>
          <div class="option update-car">
          <div class="option__wrapper">
            <input class="option__input option__input_text update-car__name" type="text">
            <input class="option__input option__input_color update-car__color" type="color">
          </div>
            <button class="button button-additional option__button update-car__button">Update</button>
          </div>
        </div>
        <div class="options__race">
          <button class="button option__button button-basic race">Race</button>
          <button class="button option__button button-basic reset">Reset</button>
          <button class="button option__button button-basic generate-cars">Generate cars</button>
        </div>
      </div>
      <h2 class="heading">GARAGE (<span class="garage__carsTotal"></span>)</h2>
      <div class="garage__content"></div>
      <div class="garage__pagination pagination">
        <button class="button button-basic button-prev">Prev</button>
        <span class="pagination__page">${'pageCount'}</span>
        <button class="button button-basic button-next">Next</button>
</div>
    </div>
  </div>`;
