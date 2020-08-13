import { Player } from '../models';

export interface ChoiceRequest<T> {
  player: Player;
  options: T[];
}

export interface ChoiceResponse {
  response: number;
}
