// src/services/export/strategies/PNGExportStrategy.js
import { BaseExportStrategy } from "./BaseExportStrategy";

/**
 * PNG Export Strategy
 */
export class PNGExportStrategy extends BaseExportStrategy {
  constructor() {
    super("PNG", "image/png", "png");
  }

  async export(canvas, options = {}) {
    const {
      transparent = false,
      bgColor = "#ffffff",
      filename = "qrcode",
    } = options;

    try {
      let exportCanvas = canvas;

      if (transparent && bgColor) {
        // Criar cópia do canvas para aplicar transparência
        exportCanvas = document.createElement("canvas");
        exportCanvas.width = canvas.width;
        exportCanvas.height = canvas.height;
        const ctx = exportCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0);

        exportCanvas = this.applyTransparency(exportCanvas, bgColor);
      }

      const dataUrl = exportCanvas.toDataURL(this.mimeType, 1.0);
      this.downloadFile(dataUrl, this.generateFilename(filename));

      return { success: true, format: this.name };
    } catch (error) {
      console.error("PNG Export Error:", error);
      return { success: false, error: error.message };
    }
  }
}
