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

export { GetSnailImg };
