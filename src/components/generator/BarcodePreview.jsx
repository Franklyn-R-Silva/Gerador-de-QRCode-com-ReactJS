import React, { useRef, useEffect, useState } from "react";
import Barcode from "react-barcode";
import { AiOutlineCopy } from "react-icons/ai";
import { motion } from "framer-motion";
import ExportOptions from "./ExportOptions";
import "./GeneratorArea.css";

const BarcodePreview = ({ config, showToast }) => {
  const barcodeRef = useRef(null);
  const [error, setError] = useState(null);

  /**
   * Função auxiliar para pegar o elemento SVG
   */
  const getSVG = () => {
    return barcodeRef.current?.querySelector("svg");
  };

  /**
   * Converte SVG para Canvas
   */
  const svgToCanvas = async (svg) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas);
      };

      img.onerror = reject;
      img.src =
        "data:image/svg+xml;base64," +
        btoa(unescape(encodeURIComponent(svgData)));
    });
  };

  /**
   * Lógica de Download - Removida (agora usa ExportOptions)
   */

  /**
   * Lógica de Copiar para a Área de Transferência
   */
  const handleCopyBarcode = async () => {
    const svg = getSVG();
    if (!svg) return;

    try {
      const canvas = await svgToCanvas(svg);
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
      if (showToast) showToast("Código de barras copiado para o clipboard!");
    } catch (err) {
      console.error(err);
      if (showToast) showToast("Erro ao copiar. Tente baixar.");
    }
  };

  // Limpar erro quando o texto mudar
  useEffect(() => {
    setError(null);
  }, [config.text, config.barcodeFormat]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="preview-section"
      aria-label="Pré-visualização do código de barras"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="preview-card barcode-card"
        ref={barcodeRef}
        role="img"
        aria-label="Código de barras gerado"
        whileHover={{ scale: 1.02 }}
      >
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error-message"
            role="alert"
          >
            <p>❌ Erro ao gerar código de barras</p>
            <small>{error}</small>
          </motion.div>
        ) : (
          <Barcode
            value={config.text || "123456789"}
            format={config.barcodeFormat}
            width={config.barcodeWidth || 2}
            height={config.barcodeHeight || 100}
            displayValue={config.barcodeDisplayValue !== false}
            background={config.bgColor || "#ffffff"}
            lineColor={config.fgColor || "#000000"}
            fontSize={config.barcodeFontSize || 20}
            margin={config.barcodeMargin || 10}
            valid={(valid) => {
              if (!valid) {
                setError(
                  "Valor inválido para este formato. Verifique o tipo de código e tente novamente."
                );
              }
            }}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="action-buttons-grid"
        role="group"
        aria-label="Ações do código de barras"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyBarcode}
          className="btn btn-secondary"
          disabled={!!error}
          aria-label="Copiar código de barras para área de transferência"
        >
          <AiOutlineCopy aria-hidden="true" /> Copiar Imagem
        </motion.button>
        
        <ExportOptions
          getSVG={getSVG}
          config={config}
          isBarcode={true}
          showToast={showToast}
        />
      </motion.div>
    </motion.section>
  );
};

export default BarcodePreview;
