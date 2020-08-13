import { Player } from '../models';

export interface PublicNotificationRequest {
  content: string;
}

export interface Notification<T> {
  content: string;
  extra: T;
}

export interface NotificationRequest<T> {
  player: Player;
  notification: Notification<T>;
}

export interface NotificationResponse {
  notified: boolean;
}
