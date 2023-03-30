import RedShroom from '../imgs/snails/eating/red-shroom.png';
import GreenShroom from '../imgs/snails/eating/green-shroom.png';
import PurpleShroom from '../imgs/snails/eating/purple-shroom.png';

function GetFoodImg(food: string) {
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedFood) {
    case 'Green':
      return GreenShroom;
    case 'Purple':
      return PurpleShroom;
    default:
      return RedShroom;
  }
}

export { GetFoodImg };
