import React, { useEffect, useState } from "react";
import BookList from "../components/BookList";
import Book from "../types/Book";
import apiClient from "../utils/api";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = () => {
    apiClient
      .get("/books")
      .then((response) => {
        setBooks(response.data);
        console.log("Books:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleDelete = (id: number) => {
    apiClient
      .delete(`/books/${id}`)
      .then(() => {
        console.log("Book deleted successfully");
        getBooks();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Bookshelf</h1>
      <BookList books={books} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
