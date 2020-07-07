import { Hero } from '../heroes/hero';

export abstract class Monster {
  constructor(
    public name: string,
    public baseDamage: number | null,
    public opponent: Hero   // this field should be protected
  ) { }
}
