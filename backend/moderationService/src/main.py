import asyncio

from contextlib import (
    asynccontextmanager
)

from fastapi import FastAPI

from api.route import router

from configs.dotenv import Env

from rabbitmq.connection import (
    connect_rabbitmq,
    close_rabbitmq,
)

from rabbitmq.pub_sub import (
    subscribe_moderation_jobs,
)


IS_PRODUCTION = (
    Env.APP_ENV == "PRODUCTION"
)


@asynccontextmanager
async def lifespan(app: FastAPI):

    print(
        "CONNECTING RABBITMQ"
    )

    await connect_rabbitmq()

    print(
        "RABBITMQ CONNECTED"
    )

    print(
        "STARTING CONSUMER"
    )

    consumer_task = (
        asyncio.create_task(
            subscribe_moderation_jobs()
        )
    )

    print(
        "CONSUMER STARTED"
    )

    yield

    consumer_task.cancel()

    try:
        await consumer_task

    except asyncio.CancelledError:
        pass

    await close_rabbitmq()


app = FastAPI(

    title=Env.APP_NAME,

    version="1.0.0",

    docs_url=None
    if IS_PRODUCTION
    else "/docs",

    redoc_url=None
    if IS_PRODUCTION
    else "/redoc",

    openapi_url=None
    if IS_PRODUCTION
    else "/openapi.json",

    lifespan=lifespan,
)

app.include_router(router)

print(
    "MODERATION SERVICE STARTED"
)