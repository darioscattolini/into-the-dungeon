import { IEquipment } from "../models/models";

export const stubEquipment: IEquipment = {
  name: 'generic',
  type: 'HitPoints',
  available: true,
  appliesThisRound() { return true },
  apply() { return [] },
  discard() {}
}
