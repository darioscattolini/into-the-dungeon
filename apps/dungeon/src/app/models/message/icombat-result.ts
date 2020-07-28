import { Monster } from '../models';

export interface ICombatResult {
  monster: Monster;
  defeated: boolean;
}
