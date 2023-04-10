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
      return 'Double stars earned, no added health';
    case 'Purple':
      return 'Half stars earned, heal two health points';
    default:
      return 'Normal stars earned, heal one health point';
  }
}

async function ApplyFoodAffect(
  food: string,
  goalId: number,
  username: any,
  snailName: string,
  snailColor: string,
  snailHealth: number,
  goals_completed: number,
  goals_failed: number,
  newCurrency: number
) {
  await OWServiceProvider.deleteGoal(goalId); // TODO: Mark as completed, not delete
  // await OWServiceProvider.updateGoal(goalId, notes, newPagesRead, true);
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedFood) {
    case 'Green':
      // Double stars earned, no added health
      await OWServiceProvider.updateSnailInfo(
        username,
        snailName,
        snailColor,
        snailHealth,
        goals_completed,
        goals_failed
      );
      await OWServiceProvider.updateUserInformation(username, newCurrency);
      return;
    case 'Purple':
      // Half stars earned, heal two health points
      let purpleHealth = snailHealth + 2;
      if (snailHealth >= 3) {
        purpleHealth = 3;
      }
      await OWServiceProvider.updateSnailInfo(
        username,
        snailName,
        snailColor,
        purpleHealth,
        goals_completed,
        goals_failed
      );
      await OWServiceProvider.updateUserInformation(username, newCurrency);
      return;
    default:
      // Normal stars earned, heal one health point
      let newSnailHealth = snailHealth + 1;
      if (snailHealth >= 3) {
        newSnailHealth = 3;
      }
      await OWServiceProvider.updateSnailInfo(
        username,
        snailName,
        snailColor,
        newSnailHealth,
        goals_completed,
        goals_failed
      );
      await OWServiceProvider.updateUserInformation(username, newCurrency);
      return;
  }
}

export { GetFoodImg, GetFoodAffect, ApplyFoodAffect };
