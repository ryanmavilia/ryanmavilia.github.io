export interface Book {
  title: string;
  author: string;
  description: string;
  review?: string;
  summary?: string;
}

export interface BookshelfProps {
  books: Book[];
  shelfColor?: string;
  booksPerShelf?: number;
}
