export interface AddBookAndAuthor {
    book_name: string;
    author_name: string;
}

export interface EditBookAndAuthor extends AddBookAndAuthor {
    id: number;
}

export interface BookInfo extends AddBookAndAuthor {
    book_id: number;
    author_id: number;
}