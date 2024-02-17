import React from "react";
// Modal Component
const Modal = ({ isOpen, onClose, children }) => (
  <div
    onClick={onClose}
    className={`
      fixed inset-0 flex justify-center items-center transition-colors
      ${isOpen ? "visible bg-black/50" : "invisible"}
    `}>
    {/* modal */}
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
        bg-white rounded-xl max-w-3xl shadow w-full p-6 transition-all
        ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"></button>
      {children}
    </div>
  </div>
);
export default Modal;
