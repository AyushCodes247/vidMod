import json
from typing import Any

import aio_pika

from configs.dotenv import Env
from rabbitmq.connection import (
    get_channel,
    get_exchange,
)
from services.moderation import moderate_video


async def publish_moderation_result(
    payload: dict[str, Any],
) -> None:

    exchange = await get_exchange()

    await exchange.publish(
        aio_pika.Message(
            body=json.dumps(payload).encode("utf-8"),
            delivery_mode=aio_pika.DeliveryMode.PERSISTENT,
        ),
        routing_key="video.moderation.result",
    )

    print("MODERATION RESULT PUBLISHED")


async def subscribe_moderation_jobs():

    print("SUBSCRIBE FUNCTION CALLED")

    channel = get_channel()

    queue = await channel.declare_queue(
        Env.MODERATION_QUEUE,
        durable=True,
    )

    exchange = await get_exchange()

    await queue.bind(
        exchange,
        routing_key="video.moderation.init",
    )

    print("QUEUE BOUND SUCCESSFULLY")
    print("WAITING FOR MESSAGES")

    async with queue.iterator() as queue_iter:

        print("QUEUE ITERATOR STARTED")

        async for message in queue_iter:

            async with message.process():

                print("MESSAGE RECEIVED")

                payload = json.loads(
                    message.body.decode("utf-8")
                )

                print(payload)

                try:

                    event_payload = payload.get(
                        "payload",
                        {}
                    )

                    video_id = event_payload.get(
                        "videoId"
                    )

                    video_path = event_payload.get(
                        "videoPath"
                    )

                    user_id = event_payload.get(
                        "userId"
                    )

                    video_name = event_payload.get(
                        "videoName"
                    )

                    if not video_id:
                        raise ValueError(
                            "Missing videoId."
                        )

                    if not video_path:
                        raise ValueError(
                            "Missing videoPath."
                        )

                    moderation_result = (
                        await moderate_video(
                            video_id=video_id,
                            video_path=video_path,
                        )
                    )

                    moderation_result["eventId"] = (
                        payload.get("eventId")
                    )

                    moderation_result["eventName"] = (
                        "VideoModerationCompleted"
                    )

                    moderation_result["serviceName"] = (
                        "MODERATION_SERVICE"
                    )

                    moderation_result["userId"] = (
                        user_id
                    )

                    moderation_result["videoName"] = (
                        video_name
                    )

                    print(
                        "PUBLISHING MODERATION RESULT"
                    )

                    await publish_moderation_result(
                        moderation_result
                    )

                    print(
                        "MODERATION RESULT SENT"
                    )

                except Exception as error:

                    print(error)

                    failed_result = {
                        "eventId": payload.get(
                            "eventId"
                        ),
                        "eventName":
                        "VideoModerationFailed",
                        "serviceName":
                        "MODERATION_SERVICE",
                        "videoId":
                        payload.get(
                            "payload",
                            {}
                        ).get(
                            "videoId"
                        ),
                        "userId":
                        payload.get(
                            "payload",
                            {}
                        ).get(
                            "userId"
                        ),
                        "videoName":
                        payload.get(
                            "payload",
                            {}
                        ).get(
                            "videoName"
                        ),
                        "status":
                        "FAILED",
                        "error":
                        str(error),
                    }

                    await publish_moderation_result(
                        failed_result
                    )