export interface IPlayer {
  readonly name: string;
  readonly victories: number;
  readonly defeats: number;
  surviveDungeon(): void;
  dieInDungeon(): void;
}
