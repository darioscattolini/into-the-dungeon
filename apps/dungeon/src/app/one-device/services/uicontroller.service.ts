import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { IChoiceRequest, IChoiceResponse, IGameResult } from '../../models/models';

type INotification = IGameResult;

@Injectable({
  providedIn: OneDeviceModule
})
export class UIControllerService {

  constructor() { }

  public async requestChoice<T>(request: IChoiceRequest<T>): Promise<IChoiceResponse> {
    if (request.options.length < 2) throw new Error(
      'requestChoice must be called with at least two options'
    );

    const mockResponse = 2;

    return { response: mockResponse };
  }

  public async sendNotification(notification: INotification): Promise<void> {

  }
}
