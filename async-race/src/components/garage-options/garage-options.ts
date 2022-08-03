import { createCar, updateCar } from '../../controllers/api-services/garage';
import { colorRandomizer, nameRandomizer } from '../car/car-randomizer';
import { Car } from '../../models/car.interface';

const createElemCar = async (currentRenderPage: () => void) => {
  const inputCreateCarName: HTMLInputElement = document.querySelector('.create-car__name') as HTMLInputElement;
  const inputCreateCarColor: HTMLInputElement = document.querySelector('.create-car__color') as HTMLInputElement;

  await createCar({
    name: inputCreateCarName.value ? inputCreateCarName.value : nameRandomizer(),
    color: inputCreateCarColor.value,
  });

  currentRenderPage();
};

const generateElemCars = (currentRenderPage: () => void) => {
  const arrayOfCreateCar: Promise<Car>[] = Array(100).fill(undefined).map(() => createCar({
    name: nameRandomizer(),
    color: colorRandomizer(),
  }));

  console.log(arrayOfCreateCar);

  Promise.all(arrayOfCreateCar)
    .then(() => currentRenderPage());
};

export function createElementCar(currentRenderPage: () => void) {
  const buttonCreate: HTMLButtonElement = document.querySelector('.create-car__button') as HTMLButtonElement;

  buttonCreate.addEventListener('click', () => createElemCar(currentRenderPage));
}

export function generate100Cars(currentRenderPage: () => void) {
  const buttonGenerateCars: HTMLButtonElement = document.querySelector('.generate-cars') as HTMLButtonElement;

  buttonGenerateCars.addEventListener('click', () => generateElemCars(currentRenderPage));
}

export function updateElementCar(currentRenderPage: () => void): void {
  const buttonUpdateCar: HTMLButtonElement = document.querySelector('.update-car__button') as HTMLButtonElement;
  const updateCarColor: HTMLInputElement = document.querySelector('.update-car__color') as HTMLInputElement;
  const updateCarName: HTMLInputElement = document.querySelector('.update-car__name') as HTMLInputElement;

  buttonUpdateCar.addEventListener('click', async () => {
    const selectedCarId: string | undefined = buttonUpdateCar.dataset.carId;

    if (selectedCarId && updateCarColor && updateCarName) {
      await updateCar({
        name: updateCarName.value,
        color: updateCarColor.value,
        id: selectedCarId,
      });

      currentRenderPage();
    }
  });
}
