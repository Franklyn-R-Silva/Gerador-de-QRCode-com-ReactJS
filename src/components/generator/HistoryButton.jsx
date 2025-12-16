// src/components/generator/HistoryButton.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineHistory } from "react-icons/ai";

const HistoryButton = () => {
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    // Atualizar contagem periodicamente
    const updateCount = () => {
      if (window.getHistoryCount) {
        setHistoryCount(window.getHistoryCount());
      }
    };

    updateCount();
    const interval = setInterval(updateCount, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (window.openHistoryPanel) {
      window.openHistoryPanel();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn-history"
      aria-label="Ver histórico"
      title={`Histórico (${historyCount} itens)`}
    >
      <AiOutlineHistory size={20} />
      <span>Histórico</span>
      {historyCount > 0 && (
        <span className="history-badge">{historyCount}</span>
      )}
    </button>
  );
};

export default HistoryButton;
