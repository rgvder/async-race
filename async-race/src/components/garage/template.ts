import ElementBuilder from '../../controllers/element-builder';

export const templateGarage = ElementBuilder.buildTemplate`
  <div class="garage">
    <div class="wrapper">
      <div class="garage__options">
        <div class="options">
        <div class="option create-car">
            <input class="option__input-text" type="text">
            <input class="option__input-color" type="color">
            <button class="button option__button create-car__button">Create</button>
          </div>
          <div class="option update-car">
            <input class="option__input-text" type="text">
            <input class="option__input-color" type="color">
            <button class="button option__button update-car__button">Update</button>
          </div>
        </div>
        <div class="options_race">
          <button class="button race">race</button>
          <button class="button reset">reset</button>
          <button class="button generate-cars">generate cars</button>
        </div>
      </div>
      <h2 class="heading">garage (${'total'})</h2>
      <div class="garage__content"></div>
      <div class="garage__pagination"></div>
    </div>
  </div>`;
