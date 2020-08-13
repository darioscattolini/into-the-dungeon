export class Player {
  public nextPlayer: Player | undefined;
  
  public get name() { return this._name; }
  private _name: string;
  
  public get victories() { return this._victories; }
  private _victories: number;
  
  public get defeats() { return this._defeats; }
  private _defeats: number;

  public get active(): boolean { return this._active; }
  private _active: boolean;

  private score: number;

  constructor(name: string) { 
    if (name === '') {
      throw new Error('Player\'s names should have at least one character');
    }
    this._name = name;
    this._victories = 0;
    this._defeats = 0;
    this._active = true;
    this.score = 0;
  }

  public static buildRanking(players: Player[]) {
    const ranking: Player[][] = [];

    const classification: { [key: string]: Player[] } = {};
    for (const player of players) {
      if (classification[player.score]) {
        classification[player.score].push(player);
      } else {
        classification[player.score] = [player];
      }
    }

    for (let i = 2; i >= -2; i--) {
      if (classification[i]) {
        ranking.push(
          classification[i].sort(
            (player1, player2) => player1.name.localeCompare(player2.name)
          )
        );
      }
    }

    return ranking;
  }

  public surviveDungeon(): void {
    if(this._victories === 2) {
      throw new Error('The game must end after a player reaches 2 victories');
    }
    this._victories++;
    this.updateScore();
  }

  public dieInDungeon(): void {
    if(this._defeats === 2) {
      throw new Error('The game must end after a player reaches 2 defeats');
    }
    this._defeats++;
    this.updateScore();
    if (this._defeats === 2) this._active = false;
  }

  private updateScore() {
    this.score = this.victories - this.defeats;
  }
}
