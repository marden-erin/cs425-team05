// Hat Images
import AstronautHat from '../imgs/snails/accessories/astronaut-hat.png';
import CowboyHat from '../imgs/snails/accessories/cowboy-hat.png';
import PartyHat from '../imgs/snails/accessories/party-hat.png';

// Glasses Images
import RoundGlasses from '../imgs/snails/accessories/round-glasses.png';
import SquareGlasses from '../imgs/snails/accessories/square-glasses.png';
import SunGlasses from '../imgs/snails/accessories/sun-glasses.png';

function GetHatImg(accessory: string) {
  const capitalizedAccessory =
    accessory.charAt(0).toUpperCase() + accessory.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedAccessory) {
    case 'Astronaut':
      return AstronautHat;
    case 'Cowboy':
      return CowboyHat;
    case 'Party':
      return PartyHat;
    default: // no hat
      return;
  }
}

function GetGlassesImg(accessory: string) {
  const capitalizedAccessory =
    accessory.charAt(0).toUpperCase() + accessory.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedAccessory) {
    case 'Round':
      return RoundGlasses;
    case 'Square':
      return SquareGlasses;
    case 'Sun':
      return SunGlasses;
    default: // no glasses
      return;
  }
}

export { GetHatImg, GetGlassesImg };
