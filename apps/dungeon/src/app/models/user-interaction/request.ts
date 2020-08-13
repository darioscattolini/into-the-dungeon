import { DecisionRequest } from './decision';
import { ChoiceRequest } from './choice';
import { NotificationRequest } from './notification';

// Perhaps unnecessary
export type Request<T> = DecisionRequest<T> | ChoiceRequest<T> | NotificationRequest<T>;
