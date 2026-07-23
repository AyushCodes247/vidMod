import uvicorn

from configs.dotenv import Env


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=Env.APP_PORT,
        reload=Env.APP_ENV == "PRODUCTION",
    )