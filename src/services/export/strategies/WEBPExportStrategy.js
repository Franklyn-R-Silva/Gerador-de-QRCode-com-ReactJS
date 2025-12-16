// src/services/export/strategies/WEBPExportStrategy.js
import { BaseExportStrategy } from "./BaseExportStrategy";

/**
 * WEBP Export Strategy
 */
export class WEBPExportStrategy extends BaseExportStrategy {
  constructor() {
    super("WEBP", "image/webp", "webp");
  }

  async export(canvas, options = {}) {
    const {
      transparent = false,
      bgColor = "#ffffff",
      quality = 0.95,
      filename = "qrcode",
    } = options;

    try {
      let exportCanvas = canvas;

      if (transparent && bgColor) {
        exportCanvas = document.createElement("canvas");
        exportCanvas.width = canvas.width;
        exportCanvas.height = canvas.height;
        const ctx = exportCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, 0);

        exportCanvas = this.applyTransparency(exportCanvas, bgColor);
      }

      const dataUrl = exportCanvas.toDataURL(this.mimeType, quality);
      this.downloadFile(dataUrl, this.generateFilename(filename));

      return { success: true, format: this.name };
    } catch (error) {
      console.error("WEBP Export Error:", error);
      return { success: false, error: error.message };
    }
  }
}
