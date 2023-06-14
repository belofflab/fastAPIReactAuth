from fastapi import APIRouter, Response

from src import schemas
from src.database import models
from src.utils.auth.handler import sign_jwt, decode_jwt
from src.utils.hashing import Hasher

router = APIRouter(prefix='/api/v1/auth', tags=['Авторизация'])



@router.post('/signin')
async def signin(user: schemas.UserCreate):
    q_user = await models.User.objects.get_or_none(email=user.email)

    if not q_user:
        return Response(status_code=403, content='Неверная почта или пароль')
    
    if not Hasher.verify_password(user.password, q_user.password):
        return Response(status_code=403, content='Неверная почта или пароль')
    
    access_token = sign_jwt(user_id=q_user.idx, email=q_user.email)

    q_user.password = ''
    q_user = q_user.dict()
    q_user.update(access_token)

    return q_user
    


@router.post('/signup')
async def signup(user: schemas.UserCreate) -> schemas.User:
    q_user = await models.User.objects.get_or_none(email=user.email)

    if q_user is not None:
        return Response(status_code=403, content='Пользователь уже существует')
    
    user.password = Hasher.get_password_hash(user.password)
    
    new_player =  await models.User.objects.create(**user.dict())

    access_token = sign_jwt(user_id=new_player.idx, email=new_player.email)

    new_player.password = ''
    new_player = new_player.dict()
    new_player.update(access_token)

    return new_player


@router.get('/me')
async def me(token: str):
    isTokenValid: bool = False

    try:
        payload = decode_jwt(token)
    except:
        payload = None
    if payload:
        isTokenValid = True
    
    if not isTokenValid:
        return Response(status_code=403, content='Вы не авторизованы!')
    
    current_player =  await models.User.objects.get(idx=payload['user_id'])
    current_player.password = ''
    return current_player 
    
