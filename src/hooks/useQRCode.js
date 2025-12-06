import { useCallback } from "react";

/**
 * Hook personalizado para manipular ações do QR Code
 * @param {React.RefObject} qrRef - Referência para o container do QR Code
 * @param {Function} showToast - Função para exibir notificações
 */
const useQRCode = (qrRef, showToast) => {
  // Função auxiliar para encontrar o canvas dentro do elemento ref
  const getCanvas = useCallback(() => {
    if (!qrRef.current) return null;
    return qrRef.current.querySelector("canvas");
  }, [qrRef]);

  // Ação: Baixar QR Code
  const downloadQRCode = useCallback(() => {
    const canvas = getCanvas();
    if (!canvas) {
      if (showToast) showToast("Erro: Canvas não encontrado!");
      return;
    }

    try {
      // Cria um link temporário para forçar o download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`; // Nome único com timestamp
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (showToast) showToast("Download iniciado!");
    } catch (err) {
      console.error("Erro ao baixar:", err);
      if (showToast) showToast("Erro ao baixar QR Code.");
    }
  }, [getCanvas, showToast]);

  // Ação: Copiar para Área de Transferência
  const copyQRCode = useCallback(async () => {
    const canvas = getCanvas();
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");

      // O Clipboard API precisa de um Blob, não de uma string Base64
      const blob = await (await fetch(dataUrl)).blob();

      const clipboardItem = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);

      if (showToast) showToast("QR Code copiado para o clipboard!");
    } catch (err) {
      console.error("Erro ao copiar:", err);
      if (showToast) showToast("Erro ao copiar. Tente baixar.");
    }
  }, [getCanvas, showToast]);

  return {
    downloadQRCode,
    copyQRCode,
  };
};

export default useQRCode;
