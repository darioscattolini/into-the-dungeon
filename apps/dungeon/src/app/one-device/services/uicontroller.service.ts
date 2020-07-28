import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { IChoiceRequest, IChoiceResponse } from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class UIControllerService {

  constructor() { }

  public async requestChoice(request: IChoiceRequest): Promise<IChoiceResponse> {
    if (request.options.length < 2) throw new Error(
      'requestChoice must be called with at least two options'
    );

    const mockResponse = 2;

    return { response: mockResponse };
  }
}
