export interface IChoiceRequest<T> {
  player: string;
  options: T[];
}

export interface IChoiceResponse {
  response: number;
}
