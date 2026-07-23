import os
import shutil
import subprocess

from configs.dotenv import Env

def extract_frames(
    video_path: str,
    output_directory: str
) -> int:
    """
     Extract frames from a video file.

    Supports videos with or without audio streams.

    Args:
        video_path (str): Absolute or relative path to the video file.
        output_directory (str): Directory where frames will be stored.

    Returns:
        int: Total number of extracted frames.

    Raises:
        FileNotFoundError:
            If the provided video path does not exist.

        RuntimeError:
            If FFmpeg fails to extract the frames.
    """

    if not os.path.exists(video_path):
        raise FileNotFoundError(
            f"Video file does not exist: {video_path}"
        )
    
    if os.path.exists(output_directory):
        shutil.rmtree(output_directory)
    
    os.makedirs(output_directory, exist_ok=True)

    output_pattern = os.path.join(
        output_directory,
        "frame_%04d.jpg"
    )

    command = [
        Env.FFMPEG_PATH,
        "-i",
        video_path,
        "-an",
        "-vf",
        f"fps={Env.MAX_FRAME_RATE}",
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        output_pattern
    ]

    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        raise RuntimeError(
            f"FFmpeg frame extraction failed.\n{result.stderr}"
        )
    
    frame_count = len(
        [
            frame for frame in os.listdir(output_directory)
            if frame.endswith(".jpg")
        ]
    )

    return frame_count

def get_frame_paths(output_directory : str) -> list[str]:
    """
    Return all extracted frame paths in sorted order.
    """
    if not os.path.exists(output_directory):
        return []
    
    frames = [
        os.path.join(output_directory,frame)
        for frame in os.listdir(output_directory)
        if frame.endswith(".jpg")
    ]

    frames.sort()

    return frames

def remove_frames(output_directory: str) -> None:
    """
    Remove all extracted frames.
    """

    if os.path.exists(output_directory):
        shutil.rmtree(output_directory)
    
def remove_video(video_path) -> None:
    """
    Remove a temporary video file.
    """

    if os.path.exists(video_path):
        os.remove(video_path)