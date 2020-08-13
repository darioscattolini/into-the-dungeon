import { Monster, Equipment, Player } from '../models';

export interface BidRequest {
  type: 'bid';
  player: Player;
  content: null;
}

export interface MonsterAdditionRequest {
  type: 'add monster';
  player: Player;
  content: Monster;
}

export interface EquipmentRemovalRequest {
  type: 'remove equipment';
  player: Player;
  content: Equipment[];
}

export interface BidResponse {
  type: 'bid';
  content: boolean
}

export interface MonsterAdditionResponse {
  type: 'add monster';
  content: boolean
}

export interface EquipmentRemovalResponse {
  type: 'remove equipment';
  content: Equipment
}

export type BiddingActionRequest = BidRequest | MonsterAdditionRequest | EquipmentRemovalRequest;

export type BiddingActionResponse = BidResponse | MonsterAdditionResponse | EquipmentRemovalResponse;

export type BiddingActionType = BiddingActionRequest['type'];
