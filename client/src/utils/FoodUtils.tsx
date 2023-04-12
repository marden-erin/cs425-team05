import RedShroom from '../imgs/snails/eating/red-shroom.png';
import GreenShroom from '../imgs/snails/eating/green-shroom.png';
import PurpleShroom from '../imgs/snails/eating/purple-shroom.png';
import OWServiceProvider from '../OuterWhorldServiceProvider';

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
      return "Half stars, but two health points";
    default:
      return 'Regular stars, one health point';
  }
}

// TODO: Actually apply affect
async function ApplyFoodAffect(
  food: string,
  goalId: number,
  username: any,
  snailName: string,
  snailColor: string,
  snailHealth: number,
  goals_completed: number,
  goals_failed: number,
  accessories: Object,
  isActive: boolean,
  newCurrency: number,
) {
  await OWServiceProvider.deleteGoal(goalId); // TODO: Mark as completed, not delete
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  
  let newSnailHealth = snailHealth;
  
    switch (capitalizedFood) {
    case 'Green':
      // Leave health as it is
      break;
    case 'Purple':
      newSnailHealth += 2;
      break;
    default:
      newSnailHealth += 1;
      break;  
  }

  // Heal snail
  
    newSnailHealth = newSnailHealth > 3 ? 3 : newSnailHealth;
    await OWServiceProvider.updateSnailInfo(
      username,
      snailName,
      snailColor,
      newSnailHealth,
      goals_completed,
      goals_failed,
      accessories,
      isActive
    );

  return;

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

export { GetFoodImg, GetFoodAffect, GetFoodAffectText, ApplyFoodAffect };