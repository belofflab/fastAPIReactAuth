import os 
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__name__).resolve().parent
ENV_FILE = BASE_DIR / '.env'

if os.path.exists(ENV_FILE):
  load_dotenv(ENV_FILE)



DATABASE_URL = os.getenv('DATABASE_URL')
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS').split(',')

JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
JWT_SECRET = os.getenv('JWT_SECRET') 