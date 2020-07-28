export interface IPlayerActionResponse {
  response: 'ok' | number;
}

export interface IPlayerChoiceResponse extends IPlayerActionResponse {
  type: 'choice';
  options: number;
}
