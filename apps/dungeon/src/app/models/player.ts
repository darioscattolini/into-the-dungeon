export class Player {
  private _name: string;
  private _victories: number;
  private _defeats: number;

  constructor(name: string) { 
    if (name === '') throw new Error('Player\'s names should have at least one character');
    this._name = name;
    this._victories = 0;
    this._defeats = 0;
  }

  public get name(): string {
    return this._name;
  }

  public get victories(): number {
    return this._victories;
  }

  public get defeats(): number {
    return this._defeats;
  }

  public surviveDungeon(): void {
    if(this._victories === 2) {
      throw new Error('The game must end after a player reaches 2 victories');
    }
    this._victories++;
  }

  public beKilledInDungeon(): void {
    if(this._defeats === 2) {
      throw new Error('The game must end after a player reaches 2 defeats');
    }
    this._defeats++;
  }
}
