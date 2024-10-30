// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import { BookCard } from "./components/BookCard";
import { BookModal } from "./components/BookModal";
import { Alert } from "./components/Alert";

const API_URL = "http://localhost:5000/api/books";

const App = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      showAlert("error", "Failed to fetch books");
    }
  };

  const handleSave = async (bookData) => {
    try {
      if (selectedBook) {
        await axios.put(`${API_URL}/${selectedBook._id}`, bookData);
        showAlert("success", "Book updated successfully");
      } else {
        await axios.post(API_URL, bookData);
        showAlert("success", "Book added successfully");
      }
      fetchBooks();
      handleCloseModal();
    } catch (error) {
      showAlert("error", "Failed to save book");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        showAlert("success", "Book deleted successfully");
        fetchBooks();
      } catch (error) {
        showAlert("error", "Failed to delete book");
      }
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Book Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Book
          </button>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <BookModal
          isOpen={isModalOpen}
          book={selectedBook}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default App;
