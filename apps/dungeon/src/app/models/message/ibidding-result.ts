import { Hero, Monster, Player } from "../models";

export interface IBiddingResult {
  raider: Player;
  hero: Hero;
  enemies: Monster[];
}
