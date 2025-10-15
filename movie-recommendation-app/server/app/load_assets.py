import joblib
import pandas as pd
from typing import Tuple
import numpy as np


def load_assets() -> Tuple[pd.DataFrame, np.ndarray]:
    """
    Loads movie recommendation assets (DataFrame and similarity matrix)
    from a joblib file.
    """
    try:
        file = "assets/movies_recommendations_assets_min.joblib"
        df, similarity_matrix = joblib.load(file)
        return df, similarity_matrix
    except FileNotFoundError:
        print(f"Error: The file {file}  was not found.")
    except Exception as e:
        print(f"Exception occurred while loading assets: {e}")
