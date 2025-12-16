// src/services/export/strategies/BaseExportStrategy.js

/**
 * Base Export Strategy (Abstract)
 * Define a interface para todas as estratégias de exportação
 */
export class BaseExportStrategy {
  constructor(name, mimeType, extension) {
    if (this.constructor === BaseExportStrategy) {
      throw new Error(
        "BaseExportStrategy é uma classe abstrata e não pode ser instanciada diretamente"
      );
    }
    this.name = name;
    this.mimeType = mimeType;
    this.extension = extension;
  }

  /**
   * Método abstrato - deve ser implementado pelas subclasses
   */
  async export(canvas, options = {}) {
    throw new Error("Método export() deve ser implementado pela subclasse");
  }

  /**
   * Download do arquivo
   */
  downloadFile(dataUrl, filename) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Gerar nome do arquivo
   */
  generateFilename(baseName = "qrcode") {
    const timestamp = new Date().getTime();
    return `${baseName}_${timestamp}.${this.extension}`;
  }

  /**
   * Aplicar transparência ao canvas
   */
  applyTransparency(canvas, bgColor) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Converter hex para RGB
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);

    // Tornar pixels do background transparentes
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] === r && data[i + 1] === g && data[i + 2] === b) {
        data[i + 3] = 0; // Alpha = 0 (transparente)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }
}
