import amqplib , { type Channel } from "amqplib";
import { time } from "@/utils/essential.util.js";
import logger from "@utils/logger.util.js";

export const EXCHANGE_NAME = "vidmod.events";
export const EXCHANGE_TYPE = "topic";

let channel : Channel;

export const connectRabbitMQ = async (url : string) => {
    const connection = await amqplib.connect(url);

    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME,EXCHANGE_TYPE, {
        durable : true
    });

    logger.info(`RABBITMQ CONNECTED SUCCESSFULLY.`);

    return channel;
}

export const getChannel = () => channel;