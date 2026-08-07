import { EXCHANGE_NAME, getChannel } from "./config.js";
import type { EventPayload } from "./event.type.js";
import logger from "@utils/logger.util.js";

export const publish = async (
  routingKey: string,
  event: EventPayload,
): Promise<void> => {
  const channel = getChannel();

  channel.publish(
    EXCHANGE_NAME,
    routingKey,
    Buffer.from(JSON.stringify(event)),
    {
      persistent: true,
    },
  );

  logger.info(`EVENT PUBLISHED : ${event.eventName}`);
};

export const subscribe = async (
  queueName: string,
  routingKey: string,
  callback: (data: unknown) => Promise<void>,
): Promise<void> => {
  const channel = getChannel();

  /*
  |--------------------------------------------------------------------------
  | Dead Letter Queue Configuration
  |--------------------------------------------------------------------------
  */

  const deadLetterExchange = `${queueName}.dlx`;
  const deadLetterQueue = `${queueName}.dead-letter`;

  await channel.assertExchange(deadLetterExchange, "direct", {
    durable: true,
  });

  await channel.assertQueue(deadLetterQueue, {
    durable: true,
  });

  await channel.bindQueue(deadLetterQueue, deadLetterExchange, "dead");

  /*
  |--------------------------------------------------------------------------
  | Main Queue
  |--------------------------------------------------------------------------
  */

  await channel.assertQueue(queueName, {
    durable: true,
    deadLetterExchange,
    deadLetterRoutingKey: "dead",
  });

  await channel.bindQueue(queueName, EXCHANGE_NAME, routingKey);

  /*
  |--------------------------------------------------------------------------
  | Consumer
  |--------------------------------------------------------------------------
  */

  channel.consume(queueName, async (message) => {
    if (!message) return;

    try {
      const data = JSON.parse(message.content.toString());

      await callback(data);

      channel.ack(message);

      logger.info(`EVENT ACKNOWLEDGED.`);
    } catch (error) {
      logger.error(`EVENT PROCESSING FAILED : ${error}`);

      /*
      |--------------------------------------------------------------------------
      | Reject the message.
      | RabbitMQ automatically moves it to the DLQ.
      |--------------------------------------------------------------------------
      */

      channel.nack(message, false, false);
    }
  });
};
