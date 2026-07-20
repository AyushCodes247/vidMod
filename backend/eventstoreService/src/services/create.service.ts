import { subscribe } from "@/rabbitmq/event.pubSub.js";
import eventModel, { validateSchema } from "@/model/event.model.js";

const createLog = async (): Promise<void> => {
  await subscribe("event-store-queue", "#", async (event) => {
    const data = {
      eventId: event.eventId,
      aggregateId:
        event.payload?.userId ??
        event.payload?.videoId ??
        event.payload?.moderationId ??
        null,
      eventName: event.eventName,
      serviceName: event.serviceName,
      eventTime: new Date(event.timestamp),
      eventVersion: 1,
      payload: event.payload,
    };

    const { error, value } = validateSchema(data);

    if (error) {
      throw new Error(error.message);
    }

    await eventModel.create(value);
  });
};

export default createLog;
