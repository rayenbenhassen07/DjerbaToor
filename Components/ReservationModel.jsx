"use client";
import React, { useState } from "react";

const ReservationModal = ({ isOpen, onClose, onSubmit, reservationData }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remarque, setRemarque] = useState("");

  const handleModalSubmit = () => {
    const userData = {
      name,
      quantity,
      phone,
      email,
      remarque,
    };

    // Merge user data with reservation data and submit
    onSubmit({ ...reservationData, ...userData });
  };

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Reservation Details</h2>
        <form>
          <label>
            Name:
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            Phone:
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label>
            Email:
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Remarque:
            <textarea
              value={remarque}
              onChange={(e) => setRemarque(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleModalSubmit}>
            Confirm Reservation
          </button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default ReservationModal;
