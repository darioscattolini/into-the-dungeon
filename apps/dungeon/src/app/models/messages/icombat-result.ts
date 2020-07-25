import { Monster } from '../monster/monster';

export interface ICombatResult {
  monster: Monster;
  defeated: boolean;
}
