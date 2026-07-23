import aio_pika

from configs.dotenv import Env


connection = None
channel = None

EXCHANGE_NAME = "vidmod.events"


async def connect_rabbitmq():

    global connection
    global channel

    print("CONNECT FUNCTION CALLED")

    connection = await aio_pika.connect_robust(
        Env.RABBITMQ_URI
    )

    print("CONNECTION CREATED")

    channel = await connection.channel()

    await channel.set_qos(
        prefetch_count=1
    )

    print("RABBITMQ READY")


def get_channel():

    if channel is None:
        raise RuntimeError(
            "RabbitMQ channel is not initialized."
        )

    return channel


async def get_exchange():

    channel = get_channel()

    exchange = await channel.declare_exchange(
        EXCHANGE_NAME,
        aio_pika.ExchangeType.TOPIC,
        durable=True,
    )

    return exchange


async def close_rabbitmq():

    global connection

    if connection:
        await connection.close()