// src/utils/validators.js

/**
 * Validar se é uma URL válida
 */
export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Validar se é um email válido
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validar cor hexadecimal
 */
export const isValidHexColor = (hex) => {
  const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return re.test(hex);
};

/**
 * Validar se string não está vazia
 */
export const isNotEmpty = (str) => {
  return str && str.trim().length > 0;
};

/**
 * Validar tamanho mínimo e máximo
 */
export const isValidLength = (str, min, max) => {
  const length = str ? str.length : 0;
  return length >= min && length <= max;
};

/**
 * Validar número dentro de um range
 */
export const isInRange = (num, min, max) => {
  return num >= min && num <= max;
};

/**
 * Validar formato de arquivo
 */
export const isValidFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * Validar tamanho do arquivo
 */
export const isValidFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

/**
 * Sanitizar entrada de texto
 */
export const sanitizeInput = (input) => {
  if (!input) return "";
  return input.replace(/[<>]/g, "");
};
