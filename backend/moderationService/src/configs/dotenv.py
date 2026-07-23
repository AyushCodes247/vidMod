import os
from dotenv import load_dotenv

load_dotenv()


def get_str(key: str) -> str:
    value = os.getenv(key)

    if value is None:
        raise ValueError(f"Missing environment variable: {key}")

    return value


def get_int(key: str) -> int:
    value = get_str(key)

    try:
        return int(value)
    except ValueError:
        raise ValueError(
            f"Environment variable '{key}' must be an integer."
        )


def get_float(key: str) -> float:
    value = get_str(key)

    try:
        return float(value)
    except ValueError:
        raise ValueError(
            f"Environment variable '{key}' must be a float."
        )


class Env:
    APP_NAME: str = get_str("APP_NAME")
    APP_ENV: str = get_str("APP_ENV")
    APP_PORT: int = get_int("APP_PORT")

    RABBITMQ_URI: str = get_str("RABBITMQ_URI")
    MODERATION_QUEUE: str = get_str("MODERATION_QUEUE")
    MODERATION_RESULT_QUEUE: str = get_str("MODERATION_RESULT_QUEUE")

    JWT_ACCESS_TOKEN: str = get_str("JWT_ACCESS_TOKEN")

    FFMPEG_PATH: str = get_str("FFMPEG_PATH")

    TEMP_VIDEO_PATH: str = get_str("TEMP_VIDEO_PATH")
    TEMP_FRAME_PATH: str = get_str("TEMP_FRAME_PATH")

    NUDENET_THRESHOLD: float = get_float("NUDENET_THRESHOLD")

    MAX_FRAME_RATE: int = get_int("MAX_FRAME_RATE")
    MAX_SENSITIVE_FRAMES: int = get_int("MAX_SENSITIVE_FRAMES")
    MAX_EXPLICIT_FRAMES: int = get_int("MAX_EXPLICIT_FRAMES")