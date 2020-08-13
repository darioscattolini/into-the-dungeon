import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { 
  ChoiceRequest, ChoiceResponse, 
  DecisionRequest, DecisionResponse,
  NotificationRequest, PublicNotificationRequest, NotificationResponse 
} from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class UIControllerService {

  constructor() { }

  public async requestChoice<T>(request: ChoiceRequest<T>): Promise<ChoiceResponse> {
    if (request.options.length < 2) throw new Error(
      'requestChoice must be called with at least two options'
    );

    const mockResponse = 2;

    return { response: mockResponse };
  }

  public async requestDecision<T>(request: DecisionRequest<T>): Promise<DecisionResponse> {
    const mockResponse = false;
    return { response: mockResponse };
  }

  public async sendNotification<T>(notification: NotificationRequest<T>): Promise<NotificationResponse> {
    return { notified: true };
  }

  public async sendPublicNotification(notification: PublicNotificationRequest): Promise<NotificationResponse> {
    return { notified: true };
  }
}
