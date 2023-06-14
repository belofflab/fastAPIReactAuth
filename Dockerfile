FROM python:3.11

WORKDIR /opt/backend

RUN python3 -m pip install virtualenv 
RUN python3 -m virtualenv /opt/backend/venv

COPY ./pyproject.toml ./poetry.lock* /opt/backend/

RUN /opt/backend/venv/bin/pip install poetry

RUN /opt/backend/venv/bin/poetry config virtualenvs.create false
RUN /opt/backend/venv/bin/poetry install --no-dev --no-root

COPY . /opt/backend


CMD ["/opt/backend/venv/bin/poetry", "run", "fastapi-app"]

EXPOSE 8000