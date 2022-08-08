import ElementBuilder from '../../controllers/element-builder';

const templatePopup = ElementBuilder.buildTemplate`
  <div class="popup">
    <img class="popup__image" width="150" src="./source/images/trophy.png" alt="Gold cup">
    <span class="popup__text">The WINNER is<br>${'name'}<br>${'time'} sec</span>
  </div>`;

export default templatePopup;
