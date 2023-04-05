import OWServiceProvider from '../OuterWhorldServiceProvider';

const updateSnailStatus = async (username: string) => {
  const snailInfo = await OWServiceProvider.getAllSnails(username);

  // Case 1 - User has no snails, first time login
  if (snailInfo === null) {
    return 'dne';
  }

  let needsnewSnail = true;

  for (const snail of snailInfo) {
    // Case 2 - Snail exists, but is dead

    let snailHealth = snail.health;
    const { date_died } = snail;

    if (date_died === 'null') {
      needsnewSnail = false;
    }

    // Snail is dead but doesn't have gravestone yet, navigate to graveyard
    if (snailHealth <= 0 && date_died === 'null') {
      return 'dead';
    } else if (snailHealth <= 0 && date_died !== 'null') {
      continue;
    } else {
      //See if snail dies today
      const today = new Date();
      const allGoals = await OWServiceProvider.getAllGoals(username);
      const goalID: any = [];
      let noDuplicatesID: number[];
      const goalArray: any[] = [];

      // From ViewGoals - Erin's work
      allGoals.map((x: any) => {
        var y: number = +x.goal_id;
        goalID.push(y);
      });
      //above map out puts duplicate of every goal_id
      //noDuplicatesID removes these
      noDuplicatesID = Array.from(new Set(goalID));
      for (const i of noDuplicatesID) {
        goalArray.push(await OWServiceProvider.getGoal(username, i));
      }

      allGoals.map((goal: any) => {
        const dueDate = new Date(goal.deadline);
        if (dueDate < today) {
          // If due date passed
          snailHealth--;
        }
      });

      await OWServiceProvider.updateSnailInfo(
        username,
        snail.name,
        snail.color,
        snailHealth,
        snail.goals_completed,
        snail.goals_failed
      );

      if (snailHealth <= 0) {
        return 'dead';
      }

      // Case 3 - Snail is still alive
      return 'alive';
    }
  }

  if (needsnewSnail) {
    return 'dne';
  }
};

export { updateSnailStatus };
