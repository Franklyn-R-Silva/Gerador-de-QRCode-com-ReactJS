// src/contexts/GeneratorContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { GENERATOR_TYPES } from "../constants/generatorTypes";
import { BARCODE_FORMATS } from "../constants/barcodeTypes";

const GeneratorContext = createContext();

export const useGenerator = () => {
  const context = useContext(GeneratorContext);
  if (!context) {
    throw new Error("useGenerator must be used within GeneratorProvider");
  }
  return context;
};

const initialConfig = {
  generatorType: GENERATOR_TYPES.QRCODE,
  text: "",
  fgColor: "#000000",
  bgColor: "#ffffff",
  // QR Code específico
  size: 280,
  ecLevel: "H",
  qrStyle: "squares",
  eyeStyle: "square",
  logoImage: "",
  logoOpacity: 1,
  removeQrCodeBehindLogo: false,
  // Barcode específico
  barcodeFormat: BARCODE_FORMATS.CODE128,
  barcodeWidth: 2,
  barcodeHeight: 100,
  barcodeDisplayValue: true,
  barcodeFontSize: 20,
  barcodeMargin: 10,
};

export const GeneratorProvider = ({ children }) => {
  const [config, setConfig] = useState(initialConfig);

  const updateConfig = useCallback((field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateMultipleConfigs = useCallback((updates) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const loadConfig = useCallback((newConfig) => {
    setConfig(newConfig);
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
  }, []);

  const value = {
    config,
    updateConfig,
    updateMultipleConfigs,
    loadConfig,
    resetConfig,
  };

  return (
    <GeneratorContext.Provider value={value}>
      {children}
    </GeneratorContext.Provider>
  );
};
