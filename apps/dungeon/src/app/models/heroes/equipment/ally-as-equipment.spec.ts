import { AllyAsEquipment } from './ally-as-equipment';

describe('AllyAsEquipment', () => {
  let ally: AllyAsEquipment;

  beforeEach(() => {
    ally = new AllyAsEquipment();
  });
  
  it('should create an instance', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance of AllyAsEquipment', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance with name "Ally"', () => {
    expect(ally.name).toBe('Ally');
  });

  it('should create an instance with field available with value true', () => {
    expect(ally.available).toBe(true);
  });
});
