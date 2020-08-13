import { HeroView } from "./hero-view";
import { HeroType } from "../../models";
import { bard } from './heroes/bard';
import { mage } from './heroes/mage';
import { ninja } from './heroes/ninja';
import { princess } from './heroes/princess';

type HeroViewMap = {
  [key in HeroType]: Readonly<HeroView>;
}

export const HeroViewMap: Readonly<HeroViewMap> = Object.freeze({
  bard: bard,
  mage: mage,
  ninja: ninja,
  princess: princess
});
