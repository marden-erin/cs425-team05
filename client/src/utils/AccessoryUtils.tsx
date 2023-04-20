// Hat Images
import AstronautHat from '../imgs/snails/accessories/astronaut-hat.png';
import CowboyHat from '../imgs/snails/accessories/cowboy-hat.png';
import PartyHat from '../imgs/snails/accessories/party-hat.png';

// Glasses Images
import RoundGlasses from '../imgs/snails/accessories/round-glasses.png';
import SquareGlasses from '../imgs/snails/accessories/square-glasses.png';
import SunGlasses from '../imgs/snails/accessories/sun-glasses.png';

// Cropped Hat Images
import CroppedAstronautHat from '../imgs/snails/accessories/cropped-astronaut-hat.png';
import CroppedCowboyHat from '../imgs/snails/accessories/cropped-cowboy-hat.png';
import CroppedPartyHat from '../imgs/snails/accessories/cropped-party-hat.png';

// Cropped Glasses Images
import CroppedRoundGlasses from '../imgs/snails/accessories/cropped-round-glasses.png';
import CroppedSquareGlasses from '../imgs/snails/accessories/cropped-square-glasses.png';
import CroppedSunGlasses from '../imgs/snails/accessories/cropped-sun-glasses.png';

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

function GetCroppedHatImg(accessory: string) {
  const capitalizedAccessory =
    accessory.charAt(0).toUpperCase() + accessory.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedAccessory) {
    case 'Astronaut':
      return CroppedAstronautHat;
    case 'Cowboy':
      return CroppedCowboyHat;
    case 'Party':
      return CroppedPartyHat;
    default: // no hat
      return;
  }
}

function GetCroppedGlassesImg(accessory: string) {
  const capitalizedAccessory =
    accessory.charAt(0).toUpperCase() + accessory.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedAccessory) {
    case 'Round':
      return CroppedRoundGlasses;
    case 'Square':
      return CroppedSquareGlasses;
    case 'Sun':
      return CroppedSunGlasses;
    default: // no glasses
      return;
  }
}

export { GetHatImg, GetGlassesImg, GetCroppedHatImg, GetCroppedGlassesImg };
