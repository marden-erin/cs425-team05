import OWServiceProvider from '../OuterWhorldServiceProvider';

const updateSnailStatus = async (username: string) => {
  const snailInfo = await OWServiceProvider.getSnailInfo(username);

  console.log(snailInfo);

  // Case 1 - Snail does not exist
  if (snailInfo === null) {
    return 'dne';
  }

  // Case 2 - Snail exists, but is dead
  let snailHealth = snailInfo.health;

  if (snailHealth <= 0) {
    // First, see if they're dead already
    return 'dead';
  } else {
    // See if they die today
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
        if (snailHealth <= 0) {
          return 'dead';
        }
      }
    });

    // Case 3 - Snail is still alive
    await OWServiceProvider.updateSnailInfo(
      username,
      snailInfo.name,
      snailInfo.color,
      snailHealth
    ); // Save updated snail health
    return 'alive';
  }
};

export { updateSnailStatus };
