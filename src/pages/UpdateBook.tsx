import React, { useState, useEffect } from "react";
import BookForm from "../components/BookForm";
import apiClient from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../types/Book";

const UpdateBook: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Omit<Book, "id"> | null>(null); // initialData type must be the same as the one in BookForm <Omit<Book, "id"> | null>

  // fetch book to temporary store
  useEffect(() => {
    apiClient
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, [id]);

  const handleSubmit = (updatedBook: Omit<Book, "id">) => {
    apiClient
      .put(`/books/${id}`, updatedBook)
      .then(() => {
        console.log("Book updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Update Book</h1>
      <BookForm onSubmit={handleSubmit} initialData={book} />
    </div>
  );
};

export default UpdateBook;
