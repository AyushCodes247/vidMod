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
    {
      persistent: true,
    },
  );

  console.info(`[${time()}] EVENT PUBLISHED : ${event.eventName}`);
};

export const subscribe = async (
  queueName: string,
  routingKey: string,
  callback: (data: any) => Promise<void>,
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

      console.info(`[${time()}] EVENT ACKNOWLEDGED.`);
    } catch (error) {
      console.error(`[${time()}] EVENT PROCESSING FAILED : ${error}`);

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
