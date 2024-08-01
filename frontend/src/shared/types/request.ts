export interface BooksRequest{
    query: string,
    limit: number,
    offset: number,
}

export interface TitlesRequest{
    query: string,
    limit: number,
    offset: number,
}

// {
//     "description": search,
//     "limit": 24,
//     "offset": 0,
//     "collection_name": "SimilarBooksService"
//   }
