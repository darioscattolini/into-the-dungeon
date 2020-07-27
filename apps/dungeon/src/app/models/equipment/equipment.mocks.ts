import { IEquipment } from "./equipment.interface";

export const stubEquipment: IEquipment = {
  name: 'generic',
  type: 'HitPoints',
  available: true,
  appliesThisRound() { return true },
  apply() { return [] },
  discard() {}
}
