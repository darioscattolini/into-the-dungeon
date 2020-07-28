export interface IPlayerActionRequest {
  type: 'choice' | 'acceptance';
}

export interface IPlayerChoiceRequest extends IPlayerActionRequest {
  type: 'choice';
  options: [];
}
