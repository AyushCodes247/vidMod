import { EXCHANGE_NAME, getChannel } from "./config.js";
import type { EventPayload } from "./event.type.js";
import { time } from "@/utils/essential.util.js";

export const publish = async (
  routingKey: string,
  event: EventPayload,
): Promise<void> => {
  const channel = getChannel();

  channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(event)),
    { persistent: true },
  );

  console.info(`[${time()}] EVENT PUBLISHED : ${event.eventName}`);
};

export const subscribe = async (
  queueName: string,
  routingKey: string,
  callback: (data: any) => Promise<void>,
) => {
  const channel = getChannel();

  await channel.assertQueue(queueName, { durable: true });

  await channel.bindQueue(queueName, EXCHANGE_NAME, routingKey);

  channel.consume(queueName, async (message) => {
    if (!message) return;

    try {
      const data = JSON.parse(message.content.toString());

      await callback(data);

      channel.ack(message);
    } catch (error) {
      console.error(error);

      channel.nack(message, false, false);
    }
  });
};
