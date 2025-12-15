import React, { useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import "./Toast.css";

const Toast = ({ message, onClose, duration = 3000 }) => {
  // Fecha automaticamente após 'duration' (padrão 3 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
  }, [onClose, duration]);

  return (
    <div className="toast-container">
      <div className="toast-content">
        <AiOutlineCheckCircle size={22} className="toast-icon" />
        <span className="toast-message">{message}</span>
        <button onClick={onClose} className="toast-close-btn">
          <AiOutlineClose size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
