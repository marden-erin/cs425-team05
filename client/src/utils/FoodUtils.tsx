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
      return 'Mystery Effect';
    case 'Purple':
      return "Change another goal's due date";
    default:
      return 'Heal a health point';
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
  notes: any,
  newPagesRead: number
) {
  await OWServiceProvider.deleteGoal(goalId); // TODO: Mark as completed, not delete
  // await OWServiceProvider.updateGoal(goalId, notes, newPagesRead, true);
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedFood) {
    case 'Green':
      return;
    case 'Purple':
      return;
    default:
      // Heal snail
      if (snailHealth < 3) {
        let newSnailHealth = snailHealth + 1;
        await OWServiceProvider.updateSnailInfo(
          username,
          snailName,
          snailColor,
          newSnailHealth,
          goals_completed,
          goals_failed
        );
      }
      return;
  }
}

function GetFoodAffectText(food: string) {
  const capitalizedFood =
    food.charAt(0).toUpperCase() + food.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedFood) {
    case 'Green':
      return ' starts to feel a little funny...';
    case 'Purple':
      return ' feels the need to restrategize!';
    default:
      return ' feels healed and energized!';
  }
}

export { GetFoodImg, GetFoodAffect, GetFoodAffectText, ApplyFoodAffect };
