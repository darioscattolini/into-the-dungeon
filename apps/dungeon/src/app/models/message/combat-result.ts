import { Monster } from '../models';

export interface CombatResult {
  monster: Monster;
  defeated: boolean;
}
