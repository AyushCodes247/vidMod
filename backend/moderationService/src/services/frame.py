import os

from configs.dotenv import Env
from utils.ffmpeg import (
    extract_frames,
    get_frame_paths,
    remove_frames,
    remove_video,
)


async def process_video_frames(
    video_id: str,
    video_path: str,
) -> dict[str, object]:
    """
    Extract frames from a video and return
    useful metadata.
    """

    output_directory = os.path.join(
        Env.TEMP_FRAME_PATH,
        video_id,
    )

    frame_count = extract_frames(
        video_path=video_path,
        output_directory=output_directory,
    )

    frame_paths = get_frame_paths(
        output_directory=output_directory,
    )

    return {
        "videoId": video_id,
        "frameCount": frame_count,
        "frameDirectory": output_directory,
        "framePaths": frame_paths,
    }


async def cleanup_video(
    video_path: str,
) -> None:
    """
    Delete the temporary video file.
    """

    remove_video(video_path)


async def cleanup_video_frames(
    frame_directory: str,
) -> None:
    """
    Delete all extracted video frames.
    """

    remove_frames(frame_directory)