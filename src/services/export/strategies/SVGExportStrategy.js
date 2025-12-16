// src/services/export/strategies/SVGExportStrategy.js
import { BaseExportStrategy } from "./BaseExportStrategy";

/**
 * SVG Export Strategy
 */
export class SVGExportStrategy extends BaseExportStrategy {
  constructor() {
    super("SVG", "image/svg+xml", "svg");
  }

  async export(canvas, options = {}) {
    const {
      filename = "qrcode",
      fgColor = "#000000",
      bgColor = "#ffffff",
      transparent = false,
    } = options;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const img = new Image();

      return new Promise((resolve) => {
        img.onload = () => {
          const svgContent = this._createSVG(
            img,
            canvas.width,
            canvas.height,
            fgColor,
            bgColor,
            transparent
          );
          const blob = new Blob([svgContent], { type: this.mimeType });
          const url = URL.createObjectURL(blob);

          this.downloadFile(url, this.generateFilename(filename));
          URL.revokeObjectURL(url);

          resolve({ success: true, format: this.name });
        };

        img.onerror = () => {
          resolve({
            success: false,
            error: "Failed to load image for SVG conversion",
          });
        };

        img.src = dataUrl;
      });
    } catch (error) {
      console.error("SVG Export Error:", error);
      return { success: false, error: error.message };
    }
  }

  _createSVG(img, width, height, fgColor, bgColor, transparent) {
    const bg = transparent ? "none" : bgColor;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <image href="${img.src}" width="${width}" height="${height}"/>
</svg>`;
  }
}
