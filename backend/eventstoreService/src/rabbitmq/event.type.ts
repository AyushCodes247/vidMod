export interface EventPayload {
  eventId: string;
  eventName: string;
  serviceName: string;
  timestamp: Date;
  payload: Record<string, unknown>;
}
