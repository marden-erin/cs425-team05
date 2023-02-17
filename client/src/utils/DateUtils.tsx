function NumberOfDaysUntilDate(date: Date) {
  const today = new Date();
  let timeDiff = date.getTime() - today.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1; You can read the day it's due, too
}

export { NumberOfDaysUntilDate };
