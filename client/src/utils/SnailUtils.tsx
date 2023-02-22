import BlueDefaultSnail from '../imgs/snails/blue-default.png';
import PinkDefaultSnail from '../imgs/snails/pink-default.png';
import YellowDefaultSnail from '../imgs/snails/yellow-default.png';

function GetSnailImg(snailColor: string) {
  const capitalizedColor =
    snailColor.charAt(0).toUpperCase() + snailColor.slice(1).toLowerCase(); // Ensure consistent capitalization
  if (capitalizedColor === 'Blue') {
    return BlueDefaultSnail;
  }
  if (capitalizedColor === 'Pink') {
    return PinkDefaultSnail;
  } else {
    // Fallback
    return YellowDefaultSnail;
  }
}

function GetSnailStatusText(snailHealth: Number) {
  switch(snailHealth) {
    case 3:
      return "is feeling fantastic! They're rooting for you to complete your goals."
    case 2:
      return "is getting pretty hungry. They still believe in you!"
    case 1:
      return "is starving. They're starting to worry if they can trust you."
    case 0:
      return "is dead. It's time to say goodbye."
  }
}

export { GetSnailImg, GetSnailStatusText };
