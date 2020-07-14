import { Troll } from './troll';

describe('Troll', () => {
  let troll: Troll;

  beforeEach(() => {
    troll = new Troll();
  });

  it('should create an instance', () => {
    expect(troll).toBeTruthy();
  });
});
