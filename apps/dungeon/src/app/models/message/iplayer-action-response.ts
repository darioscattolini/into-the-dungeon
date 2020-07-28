export interface BasePlayerActionResponse {
  response: 'ok' | number;
}

export interface IPlayerChoiceResponse extends BasePlayerActionResponse {
  response: number;
}

export interface IPlayerAcceptanceResponse extends BasePlayerActionResponse {
  response: 'ok';
}

export type IPlayerActionResponse = IPlayerChoiceResponse | IPlayerAcceptanceResponse;
