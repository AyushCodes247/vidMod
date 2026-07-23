from typing import TypedDict
import jwt
from jwt import InvalidTokenError
from fastapi import Header, HTTPException, status
from configs.dotenv import Env  

class JwtPayload(TypedDict):
    publicId : str
    name : str

async def verify_user_authenticity(
        authorization : str | None = Header(default=None)
) -> JwtPayload:
    if authorization is None:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing.",
        )
    
    try:
        scheme, token = authorization.split()

        if scheme.lower != "bearer":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authorization scheme.",
            )
        
        payload : JwtPayload = jwt.decode(
            token,
            Env.JWT_ACCESS_SECRET,
            algorithms=["HS256"],
        )

        public_id = payload.get("publicId")
        name = payload.get("name")

        if not public_id or not name:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload.",
            )
        
        return payload
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header.",
        )

    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token.",
        )