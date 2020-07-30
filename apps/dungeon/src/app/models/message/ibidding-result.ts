import { Hero, Monster } from "../models";

export interface IBiddingResult {
  raider: string;
  hero: Hero;
  enemies: Monster[];
}
