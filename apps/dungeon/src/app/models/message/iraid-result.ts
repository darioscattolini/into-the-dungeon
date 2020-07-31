import { Player } from '../models';

export interface IRaidResult {
  raider: Player,
  survived: boolean;
}