import { useCallback } from "react";

/**
 * Hook personalizado para manipular ações de geradores (QR Code e Barcode)
 * @param {React.RefObject} generatorRef - Referência para o container do gerador
 * @param {Function} showToast - Função para exibir notificações
 * @param {string} type - Tipo do gerador: 'qrcode' ou 'barcode'
 */
const useGenerator = (generatorRef, showToast, type = "qrcode") => {
  // Função auxiliar para encontrar o canvas/svg dentro do elemento ref
  const getElement = useCallback(() => {
    if (!generatorRef.current) return null;
    if (type === "qrcode") {
      return generatorRef.current.querySelector("canvas");
    } else {
      return generatorRef.current.querySelector("svg");
    }
  }, [generatorRef, type]);

  /**
   * Converte SVG para Canvas (necessário para barcode)
   */
  const svgToCanvas = useCallback(async (svg) => {
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
  }, []);

  // Ação: Baixar Código
  const downloadCode = useCallback(async () => {
    const element = getElement();
    if (!element) {
      if (showToast) showToast("Erro: Elemento não encontrado!");
      return;
    }

    try {
      let canvas;
      if (type === "barcode") {
        canvas = await svgToCanvas(element);
      } else {
        canvas = element;
      }

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${type}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (showToast) showToast("Download iniciado!");
    } catch (err) {
      console.error("Erro ao baixar:", err);
      if (showToast) showToast("Erro ao baixar.");
    }
  }, [getElement, showToast, type, svgToCanvas]);

  // Ação: Copiar para Área de Transferência
  const copyCode = useCallback(async () => {
    const element = getElement();
    if (!element) return;

    try {
      let canvas;
      if (type === "barcode") {
        canvas = await svgToCanvas(element);
      } else {
        canvas = element;
      }

      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);

      if (showToast) showToast("Código copiado para o clipboard!");
    } catch (err) {
      console.error("Erro ao copiar:", err);
      if (showToast) showToast("Erro ao copiar. Tente baixar.");
    }
  }, [getElement, showToast, type, svgToCanvas]);

  return {
    downloadCode,
    copyCode,
    // Aliases para compatibilidade
    downloadQRCode: downloadCode,
    copyQRCode: copyCode,
  };
};

export default useGenerator;
