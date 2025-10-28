FROM python:3.11-alpine

WORKDIR /server


COPY pyproject.toml uv.lock ./

RUN pip install --no-cache-dir  uv 

RUN uv export | uv pip install --no-cache-dir --system -r -

COPY main.py main.py
COPY ./app/ ./app
COPY ./assets/ ./assets

EXPOSE 8000

# remove --reload in prod
CMD ["fastapi", "run", "main.py", "--host", "0.0.0.0", "--reload"]


