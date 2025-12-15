import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { AiOutlineCopy } from "react-icons/ai";
import { motion } from "framer-motion";
import ExportOptions from "./ExportOptions";
import "./GeneratorArea.css";

const QRCodePreview = ({ config, showToast }) => {
  const qrRef = useRef(null);

  // Lógica de visualização: Define se os olhos são redondos ou quadrados
  const eyeRadius = config.eyeStyle === "circle" ? [10, 10, 10] : [0, 0, 0];

  /**
   * Função auxiliar para pegar o elemento Canvas
   */
  const getCanvas = () => {
    return qrRef.current?.querySelector("canvas");
  };

  /**
   * Lógica de Download - Removida (agora usa ExportOptions)
   */

  /**
   * Lógica de Copiar para a Área de Transferência
   */
  const handleCopyQRCode = async () => {
    const canvas = getCanvas();
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);
      if (showToast) showToast("QR Code copiado para o clipboard!");
    } catch (err) {
      console.error(err);
      if (showToast) showToast("Erro ao copiar. Tente baixar.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="preview-section"
      aria-label="Pré-visualização do código"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="preview-card"
        ref={qrRef}
        role="img"
        aria-label="QR Code gerado"
        whileHover={{ scale: 1.02 }}
      >
        <QRCode
          value={config.text || "https://seusite.com"}
          size={config.size}
          fgColor={config.fgColor}
          bgColor={config.bgColor}
          ecLevel={config.ecLevel}
          qrStyle={config.qrStyle}
          logoImage={config.logoImage}
          logoWidth={config.size * 0.25}
          logoHeight={config.size * 0.25}
          logoOpacity={config.logoOpacity}
          removeQrCodeBehindLogo={config.removeQrCodeBehindLogo}
          eyeRadius={eyeRadius}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="action-buttons-grid"
        role="group"
        aria-label="Ações do QR Code"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyQRCode}
          className="btn btn-secondary"
          aria-label="Copiar QR Code para área de transferência"
        >
          <AiOutlineCopy aria-hidden="true" /> Copiar Imagem
        </motion.button>
        
        <ExportOptions
          getCanvas={getCanvas}
          config={config}
          isBarcode={false}
          showToast={showToast}
        />
      </motion.div>
    </motion.section>
  );
};

export default QRCodePreview;
