import datetime
from decimal import Decimal

import ormar
import sqlalchemy

from src.database.connection import database

metadata = sqlalchemy.MetaData()


class BaseMeta(ormar.ModelMeta):
  database = database
  metadata = metadata

class User(ormar.Model):
  class Meta(BaseMeta):
    tablename="users"

  idx: int = ormar.BigInteger(primary_key=True)

  email: str = ormar.String(max_length=255, unique=True)
  password: str = ormar.String(max_length=1024)

  balance: Decimal = ormar.Decimal(max_digits=12, decimal_places=2, default=0)

  is_active: bool = ormar.Boolean(default=False)
  created: datetime.datetime = ormar.DateTime(default=datetime.datetime.now)
