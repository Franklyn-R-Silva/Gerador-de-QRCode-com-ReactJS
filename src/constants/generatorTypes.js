// src/constants/generatorTypes.js

/**
 * Tipos de geradores disponíveis na aplicação
 */
export const GENERATOR_TYPES = {
  QRCODE: "qrcode",
  BARCODE: "barcode",
};

/**
 * Labels amigáveis para cada tipo de gerador
 */
export const GENERATOR_LABELS = {
  [GENERATOR_TYPES.QRCODE]: "QR Code",
  [GENERATOR_TYPES.BARCODE]: "Código de Barras",
};
