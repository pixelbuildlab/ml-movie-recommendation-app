from fastapi import FastAPI
from typing import Any

from app.list_movies import list_movies
from app.movie_recommendation import recommend_movies
from app.constants import APP_TAGS, TAGS_METADATA

app = FastAPI(
    title="Movie Recommendation API",
    openapi_tags=TAGS_METADATA,
)


@app.get("/", tags=[APP_TAGS["app"]])
def get_status() -> dict[str, str]:
    return {"status": "ok"}


@app.get(
    "/movies",
    response_model=dict[str, Any],
    tags=[APP_TAGS["list"], APP_TAGS["app"]],
)
def get_movies_list() -> dict[str, Any]:
    response = list_movies()
    return response


@app.get(
    "/movies/recommend/{movie_id}",
    response_model=dict[str, Any],
    tags=[APP_TAGS["recommend"], APP_TAGS["app"]],
)
def get_recommended_movies(movie_id: str):
    response = recommend_movies(movie_id)
    return response
