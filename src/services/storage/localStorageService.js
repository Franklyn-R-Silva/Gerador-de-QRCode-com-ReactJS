// src/services/storage/localStorageService.js

/**
 * LocalStorage Service
 * Singleton Pattern para gerenciar acesso ao localStorage
 */
class LocalStorageService {
  constructor() {
    if (LocalStorageService.instance) {
      return LocalStorageService.instance;
    }
    LocalStorageService.instance = this;
  }

  /**
   * Salvar item no localStorage
   */
  setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error saving to localStorage (${key}):`, error);
      return false;
    }
  }

  /**
   * Obter item do localStorage
   */
  getItem(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }

  /**
   * Remover item do localStorage
   */
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  /**
   * Limpar todo o localStorage
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  /**
   * Verificar se existe uma chave
   */
  hasItem(key) {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Obter todas as chaves
   */
  getAllKeys() {
    return Object.keys(localStorage);
  }

  /**
   * Obter tamanho do storage (aproximado em bytes)
   */
  getSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }
}

// Exportar instância única (Singleton)
export default new LocalStorageService();
