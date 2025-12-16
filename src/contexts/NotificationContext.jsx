// src/contexts/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback(
    (message, type = "info", duration = 3000) => {
      setNotification({ message, type, duration });
    },
    []
  );

  const showSuccess = useCallback(
    (message) => {
      showNotification(message, "success");
    },
    [showNotification]
  );

  const showError = useCallback(
    (message) => {
      showNotification(message, "error");
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (message) => {
      showNotification(message, "info");
    },
    [showNotification]
  );

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const value = {
    notification,
    showNotification,
    showSuccess,
    showError,
    showInfo,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
