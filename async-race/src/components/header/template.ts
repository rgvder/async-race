import ElementBuilder from '../../controllers/element-builder';

export const templateHeader = ElementBuilder.buildTemplate`
  <header class="header">
    <div class="header__wrapper wrapper">
      <div class="header__buttons">
        <button class="button header__button buttonGarage">TO GARAGE</button>
        <button class="button header__button buttonWinners">TO WINNERS</button>
      </div>
      <div class="header__logo logo">
        <h1 class="logo__title">as<span>yn</span>c rac<span>e</span></h1>
      </div>
    </div>
  </header>`;
