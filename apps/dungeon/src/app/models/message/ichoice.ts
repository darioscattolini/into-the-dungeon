import { Player } from '../models';

export interface IChoiceRequest<T> {
  player: Player;
  options: T[];
}

export interface IChoiceResponse {
  response: number;
}
