// src/services/export/ExportFactory.js
import { PNGExportStrategy } from "./strategies/PNGExportStrategy";
import { WEBPExportStrategy } from "./strategies/WEBPExportStrategy";
import { SVGExportStrategy } from "./strategies/SVGExportStrategy";
import { PDFExportStrategy } from "./strategies/PDFExportStrategy";

/**
 * Export Factory
 * Factory Pattern para criar instâncias de estratégias de exportação
 */
class ExportFactory {
  constructor() {
    if (ExportFactory.instance) {
      return ExportFactory.instance;
    }

    this.strategies = new Map();
    this._registerStrategies();

    ExportFactory.instance = this;
  }

  /**
   * Registrar todas as estratégias disponíveis
   */
  _registerStrategies() {
    this.registerStrategy("PNG", new PNGExportStrategy());
    this.registerStrategy("WEBP", new WEBPExportStrategy());
    this.registerStrategy("SVG", new SVGExportStrategy());
    this.registerStrategy("PDF", new PDFExportStrategy());
  }

  /**
   * Registrar uma nova estratégia
   */
  registerStrategy(name, strategy) {
    this.strategies.set(name.toUpperCase(), strategy);
  }

  /**
   * Obter estratégia por nome
   */
  getStrategy(name) {
    const strategy = this.strategies.get(name.toUpperCase());
    if (!strategy) {
      throw new Error(
        `Export strategy '${name}' not found. Available: ${this.getAvailableFormats().join(
          ", "
        )}`
      );
    }
    return strategy;
  }

  /**
   * Exportar usando estratégia específica
   */
  async export(format, canvas, options = {}) {
    try {
      const strategy = this.getStrategy(format);
      return await strategy.export(canvas, options);
    } catch (error) {
      console.error("Export Factory Error:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Obter formatos disponíveis
   */
  getAvailableFormats() {
    return Array.from(this.strategies.keys());
  }

  /**
   * Verificar se formato é suportado
   */
  isFormatSupported(format) {
    return this.strategies.has(format.toUpperCase());
  }

  /**
   * Obter informações sobre todas as estratégias
   */
  getStrategiesInfo() {
    return Array.from(this.strategies.entries()).map(([name, strategy]) => ({
      name,
      mimeType: strategy.mimeType,
      extension: strategy.extension,
    }));
  }
}

// Exportar instância única (Singleton)
export default new ExportFactory();
