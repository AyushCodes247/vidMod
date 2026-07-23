from typing import Any

from configs.dotenv import Env
from rabbitmq.pub_sub import (
    publish_moderation_result,
    subscribe,
)
from services.moderation import (
    moderate_video,
)


async def process_video(
    data: dict[str, Any],
) -> None:
    """
    Process incoming moderation jobs.
    """

    event_payload = data.get(
        "payload",
        {},
    )

    video_id = event_payload.get(
        "videoId"
    )

    video_path = event_payload.get(
        "videoPath"
    )

    if not video_id or not video_path:

        await publish_moderation_result(
            {
                "videoId": (
                    video_id
                    or "UNKNOWN"
                ),
                "status": "FAILED",
                "error": (
                    "Invalid moderation payload."
                ),
            }
        )

        return

    moderation_result = (
        await moderate_video(
            video_id=video_id,
            video_path=video_path,
        )
    )

    await publish_moderation_result(
        moderation_result,
    )


async def moderation_consumer() -> None:
    """
    Start moderation consumer.
    """

    await subscribe(
        queue_name=Env.MODERATION_QUEUE,
        callback=process_video,
    )