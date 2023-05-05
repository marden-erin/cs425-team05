// Default Images
import BlueDefaultSnail from '../imgs/snails/blue-default.png';
import PinkDefaultSnail from '../imgs/snails/pink-default.png';
import YellowDefaultSnail from '../imgs/snails/yellow-default.png';
// Hungry Images
import BlueHungrySnail from '../imgs/snails/blue-hungry.png';
import PinkHungrySnail from '../imgs/snails/pink-hungry.png';
import YellowHungrySnail from '../imgs/snails/yellow-hungry.png';
// Starving Images
import BlueStarvingSnail from '../imgs/snails/blue-starving.png';
import PinkStarvingSnail from '../imgs/snails/pink-starving.png';
import YellowStarvingSnail from '../imgs/snails/yellow-starving.png';
// Shell Images
import BlueShell from '../imgs/snails/blue-shell.png';
import PinkShell from '../imgs/snails/pink-shell.png';
import YellowShell from '../imgs/snails/yellow-shell.png';
// Eating Images - Red Shroom
import BlueEatingRed from '../imgs/snails/eating/blue-red-shroom.png';
import PinkEatingRed from '../imgs/snails/eating/pink-red-shroom.png';
import YellowEatingRed from '../imgs/snails/eating/yellow-red-shroom.png';
// Eating Images - Purple Shroom
import BlueEatingPurple from '../imgs/snails/eating/blue-purple-shroom.png';
import PinkEatingPurple from '../imgs/snails/eating/pink-purple-shroom.png';
import YellowEatingPurple from '../imgs/snails/eating/yellow-purple-shroom.png';
// Eating Images - Green Shroom
import BlueEatingGreen from '../imgs/snails/eating/blue-green-shroom.png';
import PinkEatingGreen from '../imgs/snails/eating/pink-green-shroom.png';
import YellowEatingGreen from '../imgs/snails/eating/yellow-green-shroom.png';

function GetSnailImg(snailColor: string, snailHealth?: Number) {
  const capitalizedColor =
    snailColor.charAt(0).toUpperCase() + snailColor.slice(1).toLowerCase(); // Ensure consistent capitalization
  if (snailHealth === 0) {
    return GetShellImg(capitalizedColor);
  } else if (snailHealth === 1) {
    return GetStarvingImg(capitalizedColor);
  } else if (snailHealth === 2) {
    return GetHungryImg(capitalizedColor);
  } else {
    return GetDefaultImg(capitalizedColor);
  }
}

function GetEatingSnailImg(snailColor: string, shroomColor: string) {
  const capitalizedSnailColor =
    snailColor.charAt(0).toUpperCase() + snailColor.slice(1).toLowerCase(); // Ensure consistent capitalization
  const capitalizedShroomColor =
    shroomColor.charAt(0).toUpperCase() + shroomColor.slice(1).toLowerCase(); // Ensure consistent capitalization
  if (capitalizedShroomColor === 'Purple') {
    return GetEatingPurpleShroomImg(capitalizedSnailColor);
  } else if (capitalizedShroomColor === 'Green') {
    return GetEatingGreenShroomImg(capitalizedSnailColor);
  } else {
    // Fallback
    return GetEatingRedShroomImg(capitalizedSnailColor);
  }
}

function GetEatingRedShroomImg(snailColor: string) {
  if (snailColor === 'Blue') {
    return BlueEatingRed;
  } else if (snailColor === 'Pink') {
    return PinkEatingRed;
  } else {
    // Fallback
    return YellowEatingRed;
  }
}

function GetEatingPurpleShroomImg(snailColor: string) {
  if (snailColor === 'Blue') {
    return BlueEatingPurple;
  } else if (snailColor === 'Pink') {
    return PinkEatingPurple;
  } else {
    // Fallback
    return YellowEatingPurple;
  }
}

function GetEatingGreenShroomImg(snailColor: string) {
  if (snailColor === 'Blue') {
    return BlueEatingGreen;
  } else if (snailColor === 'Pink') {
    return PinkEatingGreen;
  } else {
    // Fallback
    return YellowEatingGreen;
  }
}

function GetDefaultImg(capitalizedColor: string) {
  if (capitalizedColor === 'Blue') {
    return BlueDefaultSnail;
  } else if (capitalizedColor === 'Pink') {
    return PinkDefaultSnail;
  } else {
    // Fallback
    return YellowDefaultSnail;
  }
}

function GetHungryImg(capitalizedColor: string) {
  if (capitalizedColor === 'Blue') {
    return BlueHungrySnail;
  } else if (capitalizedColor === 'Pink') {
    return PinkHungrySnail;
  } else {
    // Fallback
    return YellowHungrySnail;
  }
}

function GetStarvingImg(capitalizedColor: string) {
  if (capitalizedColor === 'Blue') {
    return BlueStarvingSnail;
  } else if (capitalizedColor === 'Pink') {
    return PinkStarvingSnail;
  } else {
    // Fallback
    return YellowStarvingSnail;
  }
}

function GetShellImg(capitalizedColor: string) {
  if (capitalizedColor === 'Blue') {
    return BlueShell;
  } else if (capitalizedColor === 'Pink') {
    return PinkShell;
  } else {
    // Fallback
    return YellowShell;
  }
}

function GetSnailStatusText(snailHealth: Number) {
  switch (snailHealth) {
    case 3:
      return "is feeling fantastic! They're rooting for you to complete your goals.";
    case 2:
      return 'is getting pretty hungry. They still believe in you!';
    case 1:
      return "is starving. They're starting to worry if they can trust you.";
    case 0:
      return "is dead. It's time to say goodbye.";
  }
}

export { GetSnailImg, GetEatingSnailImg, GetSnailStatusText };
