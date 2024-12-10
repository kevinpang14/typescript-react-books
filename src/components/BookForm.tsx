import React, { useState, useEffect } from "react";
import Book from "../types/Book";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
  initialData?: Omit<Book, "id"> | null; // Optional initial values for editing
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [author, setAuthor] = useState<string>(initialData?.author || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setDescription(initialData.description);
    }
  }, [initialData]);

  // Handle form submission, data type can be void or undefined
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { title, author, description });

    // Add book to the list
    onSubmit({ title, author, description });

    // Reset form fields
    setTitle("");
    setAuthor("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control"
          value={author}
          required
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        <i className="bi bi-plus-square me-2"></i>
        {initialData ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
