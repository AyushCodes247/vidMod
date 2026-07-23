import time

from services.frame import (
    process_video_frames,
    cleanup_video_frames,
)

from services.nudenet import (
    moderate_frames,
)


async def moderate_video(
    video_id: str,
    video_path: str,
):

    start_time = time.time()

    frame_metadata = None

    try:

        frame_metadata = (
            await process_video_frames(
                video_id=video_id,
                video_path=video_path,
            )
        )

        moderation_result = (
            await moderate_frames(
                frame_paths=
                frame_metadata[
                    "framePaths"
                ]
            )
        )

        print(moderation_result)

        processing_time = int(
            (
                time.time()
                - start_time
            ) * 1000
        )

        return {

            "videoId":
            video_id,

            "status":
            "COMPLETED",

            "processingTimeMs":
            processing_time,

            **moderation_result,
        }

    except Exception as error:

        return {

            "videoId":
            video_id,

            "status":
            "FAILED",

            "error":
            str(error),
        }

    finally:

        if frame_metadata:

            await cleanup_video_frames(
                frame_directory=
                frame_metadata[
                    "frameDirectory"
                ]
            )