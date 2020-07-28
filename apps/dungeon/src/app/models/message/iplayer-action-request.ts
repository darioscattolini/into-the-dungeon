interface BasePlayerActionRequest {
  type: 'choice' | 'acceptance';
}

export interface IPlayerChoiceRequest extends BasePlayerActionRequest {
  type: 'choice';
  options: [];
}

export interface IPlayerAcceptanceRequest extends BasePlayerActionRequest {
  type: 'acceptance';
  content: string;
}

export type IPlayerActionRequest = IPlayerChoiceRequest | IPlayerAcceptanceRequest;
