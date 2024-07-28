from typing import List

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from backend.src.exceptions.custom_exceptions import RankingErrorException


def ranking_titles(content: List[str], query: str) -> List[str]:
    """Реранжирование"""

    # Преобразуем данные в DataFrame
    df = pd.DataFrame(content, columns=["values"])

    # Объединяем заголовки и запрос для векторизации
    titles = df["values"].tolist()
    titles.append(query)

    # Векторизация текстов с помощью TF-IDF
    tfidf_matrix = TfidfVectorizer().fit_transform(titles)

    # Добавляем косинусное сходство в DataFrame и сортируем по нему
    df["similarity"] = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1]).flatten()
    df = df.sort_values(by="similarity", ascending=False)
    print(content)
    print(df)
    df = df[df["similarity"] != 0.0].iloc[:10]
    # Выводим отсортированный DataFrame
    if df.empty:
        raise RankingErrorException
    return df["values"].to_list()
