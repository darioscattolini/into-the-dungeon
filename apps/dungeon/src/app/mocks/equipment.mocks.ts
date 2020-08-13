import { Equipment } from "../models/models";

export const stubEquipment: Equipment = {
  name: 'generic',
  type: 'HitPoints',
  available: true,
  appliesThisRound() { return true },
  apply() { return [] },
  discard() {}
}
