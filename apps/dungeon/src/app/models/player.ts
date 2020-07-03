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

  public get name() {
    return this._name;
  }

  public get victories() {
    return this._victories;
  }

  public get defeats() {
    return this._defeats;
  }

  public surviveDungeon() {
    this._victories++;
  }

  public beKilledInDungeon() {
    this._defeats++;
  }
}
