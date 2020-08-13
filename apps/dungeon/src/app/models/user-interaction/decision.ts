import { Player } from '../models';

export interface DecisionRequest<T> {
  player: Player;
  decision: {
    name: string;
    content: string;
    extra: T;
  };
  rejection: {
    name: string;
    content: string;
  };
}

export interface DecisionResponse {
  response: boolean;
}
