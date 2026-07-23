from fastapi import APIRouter, HTTPException, status
from configs.dotenv import Env
from datetime import datetime, UTC

router = APIRouter(
    prefix="/api/v1/moderation",
    tags=["MODERATION SERVICE"]
)

@router.get("/health", status_code=200)
async def health():
    return {
        "status": "healthy",
        "service": Env.APP_NAME,
        "environment": Env.APP_ENV,
        "version": "v1",
        "timestamp": datetime.now(UTC).isoformat(),
    }

@router.get("/ready")
async def readiness():
    rabbitmq_ready = True
    ffmpeg_ready = True
    nudenet_ready = True
    storage_ready = True

    checks = {
        "rabbitmq": rabbitmq_ready,
        "ffmpeg": ffmpeg_ready,
        "nudenet": nudenet_ready,
        "storage": storage_ready,
    }

    if not all(checks.values()):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "not_ready",
                "checks": checks,
            },
        )

    return {
        "status": "ready",
        "checks": checks,
    }