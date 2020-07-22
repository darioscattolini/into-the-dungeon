export class Player {
  private _name: string;
  private _victories: number;
  private _defeats: number;
  private score: number;

  constructor(name: string) { 
    if (name === '') throw new Error('Player\'s names should have at least one character');
    this._name = name;
    this._victories = 0;
    this._defeats = 0;
    this.score = 0;
  }

  public static buildRanking(players: Player[]) {
    const ranking: Player[][] = [];

    const classification: { [key: string]: Player[] } = {};
    for (const player of players) {
      if (classification[player.score]) classification[player.score].push(player);
      else classification[player.score] = [player];
    }

    for (let i = 2; i >= -2; i--) {
      if (classification[i]) ranking.push(classification[i].sort(
        (player1, player2) => player1.name.localeCompare(player2.name)
      ));
    }

    return ranking;
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
    this.updateScore();
  }

  public dieInDungeon(): void {
    if(this._defeats === 2) {
      throw new Error('The game must end after a player reaches 2 defeats');
    }
    this._defeats++;
    this.updateScore();
  }

  private updateScore() {
    this.score = this.victories - this.defeats;
  }
}
