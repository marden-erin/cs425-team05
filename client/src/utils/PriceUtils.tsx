function GetHatPrice(accessory: string) {
  const capitalizedAccessory =
    accessory.charAt(0).toUpperCase() + accessory.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedAccessory) {
    case 'Astronaut':
      return 335;
    case 'Cowboy':
      return 255;
    case 'Party':
      return 125;
    default: // no hat
      return;
  }
}

function GetGlassesPrice(accessory: string) {
  const capitalizedAccessory =
    accessory.charAt(0).toUpperCase() + accessory.slice(1).toLowerCase(); // Ensure consistent capitalization
  switch (capitalizedAccessory) {
    case 'Round':
      return 75;
    case 'Square':
      return 95;
    case 'Sun':
      return 135;
    default: // no glasses
      return;
  }
}

export { GetHatPrice, GetGlassesPrice };