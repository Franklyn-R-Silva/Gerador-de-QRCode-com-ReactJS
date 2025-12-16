// src/services/export/strategies/PDFExportStrategy.js
import { BaseExportStrategy } from "./BaseExportStrategy";
import { jsPDF } from "jspdf";

/**
 * PDF Export Strategy
 */
export class PDFExportStrategy extends BaseExportStrategy {
  constructor() {
    super("PDF", "application/pdf", "pdf");
  }

  async export(canvas, options = {}) {
    const {
      filename = "qrcode",
      pageSize = "a4",
      orientation = "portrait",
      title = "QR Code Generator Pro",
    } = options;

    try {
      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format: pageSize,
      });

      // Adicionar título
      pdf.setFontSize(16);
      pdf.text(title, 105, 20, { align: "center" });

      // Adicionar imagem do canvas
      const imgData = canvas.toDataURL("image/png", 1.0);
      const imgWidth = 100;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const x = (210 - imgWidth) / 2; // Centralizar na página A4
      const y = 40;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      // Adicionar data de geração
      pdf.setFontSize(10);
      const date = new Date().toLocaleString("pt-BR");
      pdf.text(`Gerado em: ${date}`, 105, y + imgHeight + 20, {
        align: "center",
      });

      // Salvar PDF
      pdf.save(this.generateFilename(filename));

      return { success: true, format: this.name };
    } catch (error) {
      console.error("PDF Export Error:", error);
      return { success: false, error: error.message };
    }
  }
}
