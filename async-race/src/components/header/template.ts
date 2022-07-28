import ElementBuilder from '../../controllers/element-builder';

export const templateHeader = ElementBuilder.buildTemplate`
  <header class="header">
    <div class="header__wrapper wrapper">
      <div class="header__logo logo">
          <h1 class="logo__title">Async Race</h1>
      </div>
      <div class="header__buttons">
         <button class="button header__button buttonGarage">TO GARAGE</button>
         <button class="button header__button buttonGarage">TO WINNERS</button>
      </div>
    </div>
  </header>`;
