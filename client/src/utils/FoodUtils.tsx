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

function GetFoodAffect(food: string) {
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedFood) {
    case 'Green':
      return 'Double stars, but no health points';
    case 'Purple':
      return 'Half stars, but two health points';
    default:
      return 'Regular stars, one health point';
  }
}

function GetFoodAffectText(food: string) {
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedFood) {
    case 'Green':
      return ' suddenly feels rich!';
    case 'Purple':
      return ' feels super strong!';
    default:
      return ' feels happy!';
  }
}

export { GetFoodImg, GetFoodAffect, GetFoodAffectText };
