from app.load_assets import load_assets


def list_movies() -> list[dict[str, str | int]]:
    movies_df, _ = load_assets()
    _movies_df = movies_df[["id", "title"]]
    movies = _movies_df.to_dict(orient="records")
    response = {"status": "success", "data": movies}
    return response
