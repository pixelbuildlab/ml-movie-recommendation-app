from app.load_assets import load_assets
import numpy as np


def recommend_movies(movie_id: str):
    main_df, similarity = load_assets()

    # get movie data from df matching to id
    movie = main_df[main_df["id"].astype(str) == movie_id]

    if movie.empty:
        out = {"status": "success", "data": []}
        return out

    # get index to so similarity matrix can be used to get similarity based of index
    movie_index = movie.index[0]

    # get similarity matrix of this movie using movie_index
    movie_similarity_matrix = similarity[movie_index]

    # need to sort to get top highest similarity based movies and keeping the indexes at same place or maybe
    # known
    closest_movies_sorted = sorted(
        enumerate(movie_similarity_matrix), reverse=True, key=lambda x: x[1]
    )
    similar_movies_five: list[tuple[int, np.float64]] = closest_movies_sorted[1:6]
    # [(1213, np.float64(0.2847987184339659))] -> [(index, similarity)]

    recommended_movies = [
        {
            "movie_id": main_df.loc[item[0]].id.item(),
            "movie_name": main_df.loc[item[0]].title,
            # "movie_index": item[0],
            # "movie_similarity": item[1].item(),
        }
        for item in similar_movies_five
    ]

    out = {"status": "success", "data": recommended_movies}

    return out
