export class Player {
  public name: string;
  public victories: number;

  constructor(name: string) { 
    if (name === '') throw new Error('Player\'s names should have at least one character');
    this.name = name;
    this.victories = 0;
  }
}
