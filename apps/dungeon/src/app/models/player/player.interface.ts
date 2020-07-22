export interface IPlayer {
  name: string;
  victories: number;
  defeats: number;
  surviveDungeon(): void;
  dieInDungeon(): void;
}
