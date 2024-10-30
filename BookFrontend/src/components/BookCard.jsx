// src/components/BookCard.jsx
import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";

export const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {book.title}
          </h3>
          <p className="text-gray-600 text-base mb-1">By {book.author}</p>
          <p className="text-gray-500 text-sm mb-2">
            Published: {book.publishYear}
          </p>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(book)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            aria-label="Edit book"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
            aria-label="Delete book"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      {book.description && (
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          {book.description}
        </p>
      )}
    </div>
  );
};
