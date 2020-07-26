import { IEquipment } from '../equipment/equipment.interface';

interface IDamageEffect {
  type: 'damage';
  amount: number;
}

interface IEquipmentEffect {
  type: 'equipment';
  effect: 'add' | 'remove';
}

interface IAddEquipmentEffect extends IEquipmentEffect {
  effect: 'add';
  item: IEquipment;
}

interface IRemoveEquipmentEffect extends IEquipmentEffect {
  effect: 'remove';
}

export type MonsterEffect = IDamageEffect | IAddEquipmentEffect | IRemoveEquipmentEffect;
