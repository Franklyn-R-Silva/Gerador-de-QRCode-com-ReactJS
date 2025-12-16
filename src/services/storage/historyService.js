// src/services/storage/historyService.js
import localStorageService from "./localStorageService";

const HISTORY_KEY = "qrcode_history";
const MAX_HISTORY_ITEMS = 20;

/**
 * History Service
 * Gerencia o histórico de gerações
 */
class HistoryService {
  constructor() {
    if (HistoryService.instance) {
      return HistoryService.instance;
    }
    HistoryService.instance = this;
  }

  /**
   * Obter todo o histórico
   */
  getHistory() {
    return localStorageService.getItem(HISTORY_KEY, []);
  }

  /**
   * Adicionar item ao histórico
   */
  addToHistory(config) {
    try {
      const history = this.getHistory();

      const newItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        config: { ...config },
        preview: this._createPreview(config),
        type: config.generatorType,
      };

      // Adicionar no início e manter apenas MAX_HISTORY_ITEMS
      const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);

      localStorageService.setItem(HISTORY_KEY, updatedHistory);
      return newItem;
    } catch (error) {
      console.error("Error adding to history:", error);
      return null;
    }
  }

  /**
   * Remover item do histórico
   */
  removeFromHistory(id) {
    try {
      const history = this.getHistory();
      const filtered = history.filter((item) => item.id !== id);
      localStorageService.setItem(HISTORY_KEY, filtered);
      return true;
    } catch (error) {
      console.error("Error removing from history:", error);
      return false;
    }
  }

  /**
   * Limpar todo o histórico
   */
  clearHistory() {
    return localStorageService.removeItem(HISTORY_KEY);
  }

  /**
   * Obter item específico por ID
   */
  getHistoryItem(id) {
    const history = this.getHistory();
    return history.find((item) => item.id === id);
  }

  /**
   * Filtrar histórico por tipo
   */
  filterByType(type) {
    const history = this.getHistory();
    return history.filter((item) => item.type === type);
  }

  /**
   * Obter estatísticas do histórico
   */
  getStatistics() {
    const history = this.getHistory();
    return {
      total: history.length,
      qrCodes: history.filter((item) => item.type === "qrcode").length,
      barcodes: history.filter((item) => item.type === "barcode").length,
      lastGenerated: history[0]?.timestamp || null,
    };
  }

  /**
   * Criar preview do texto
   */
  _createPreview(config) {
    const text = config.text || "";
    const maxLength = 50;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  /**
   * Exportar histórico como JSON
   */
  exportHistory() {
    const history = this.getHistory();
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    return URL.createObjectURL(blob);
  }

  /**
   * Importar histórico de JSON
   */
  importHistory(jsonData) {
    try {
      const history = JSON.parse(jsonData);
      if (Array.isArray(history)) {
        localStorageService.setItem(
          HISTORY_KEY,
          history.slice(0, MAX_HISTORY_ITEMS)
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error importing history:", error);
      return false;
    }
  }
}

// Exportar instância única (Singleton)
export default new HistoryService();
