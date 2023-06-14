from datetime import datetime
from pydantic import BaseModel

class UserCreate(BaseModel):
  email: str
  password: str

class User(UserCreate):
  idx: int
  is_active: bool
  created: datetime