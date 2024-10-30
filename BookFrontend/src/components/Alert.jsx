import React from "react";
import { CheckCircleIcon, XCircleIcon, XIcon } from "lucide-react";

export const Alert = ({ type, message, onClose }) => {
  const alertClasses = {
    success: "bg-green-50 text-green-800 border-green-500",
    error: "bg-red-50 text-red-800 border-red-500",
  };

  return (
    <div className={`p-4 rounded-md border-l-4 ${alertClasses[type]}`}>
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircleIcon className="w-5 h-5 mr-3" />
        ) : (
          <XCircleIcon className="w-5 h-5 mr-3" />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-gray-500 hover:text-gray-700"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
