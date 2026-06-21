import { buildBreedsFromNames } from './breedFactory';

const HAMSTER_NAMES = ['Chinês', 'Roborovski', 'Sírio', 'Anão Russo', "Campbell's"];

export const allHamsterBreeds = buildBreedsFromNames(HAMSTER_NAMES, 'hamster', {
  "Campbell's": 'campbells',
});
