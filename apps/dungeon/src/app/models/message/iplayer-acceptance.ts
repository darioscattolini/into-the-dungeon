export interface IPlayerAcceptanceRequest {
  type: 'acceptance';
  content: string;
}

export interface IPlayerAcceptanceResponse {
  response: 'ok';
}
