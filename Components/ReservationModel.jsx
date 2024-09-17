"use client";
import React, { useState } from "react";

const ReservationModal = ({ isOpen, onClose, onSubmit, reservationData }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remarque, setRemarque] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone || phone.length < 8)
      newErrors.phone = "Phone number must be at least 8 characters";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    return newErrors;
  };

  console.log("ayoub ", reservationData);
  const handleModalSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const userData = {
      name,
      phone,
      email,
      remarque,
    };

    // Merge user data with reservation data and submit
    onSubmit({ ...reservationData, ...userData });

    // Optionally, you can reset the form fields
    setName("");
    setPhone("");
    setEmail("");
    setRemarque("");
    setErrors({});
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Reservation Details</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>:
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Phone <span className="text-red-500">*</span>:
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Remarque:
              <textarea
                value={remarque}
                onChange={(e) => setRemarque(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleModalSubmit}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Confirm Reservation
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ReservationModal;
