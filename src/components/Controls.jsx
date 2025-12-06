import React from "react";
import {
  AiOutlineCopy,
  AiOutlineShareAlt,
  AiOutlineSetting,
  AiOutlineBgColors,
  AiOutlinePicture,
  AiOutlineLink,
  AiOutlineSafety, // Novo ícone
} from "react-icons/ai";
import "./Controls.css";

const Controls = ({
  config,
  updateConfig,
  handleLogoUpload,
  socialLinks,
  handleCopyText,
}) => {
  const templates = [
    {
      name: "Padrão",
      fg: "#000000",
      bg: "#ffffff",
      style: "squares",
      eye: "square",
    },
    {
      name: "WhatsApp",
      fg: "#128C7E",
      bg: "#E5FFFC",
      style: "dots",
      eye: "circle",
    },
    {
      name: "Dark",
      fg: "#E0E0E0",
      bg: "#1E1E1E",
      style: "squares",
      eye: "square",
    },
    {
      name: "Azul Tech",
      fg: "#2563EB",
      bg: "#EFF6FF",
      style: "dots",
      eye: "square",
    },
  ];

  return (
    <section className="controls-section">
      <div className="control-group">
        <div className="group-header">
          <span>✨ Modelos Prontos</span>
        </div>
        <div className="templates-grid">
          {templates.map((t) => (
            <button
              key={t.name}
              className="template-btn"
              style={{
                background: t.bg,
                color: t.fg,
                border: `1px solid ${t.fg}`,
              }}
              onClick={() => {
                updateConfig("fgColor", t.fg);
                updateConfig("bgColor", t.bg);
                updateConfig("qrStyle", t.style);
                updateConfig("eyeStyle", t.eye);
              }}
              title={`Aplicar tema ${t.name}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
      {/* 1. Grupo de Conteúdo (Texto/URL) */}
      <div className="control-group">
        <div className="group-header">
          <AiOutlineLink /> <span>Conteúdo</span>
        </div>
        <div className="input-wrapper">
          <textarea
            className="input-text"
            rows={3}
            placeholder="Digite URL, texto ou email..."
            value={config.text}
            onChange={(e) => updateConfig("text", e.target.value)}
          />
        </div>

        <div className="share-row">
          <button
            onClick={handleCopyText}
            className="btn-icon"
            title="Copiar Texto"
          >
            <AiOutlineCopy /> Copiar
          </button>
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-icon whatsapp"
          >
            <AiOutlineShareAlt /> WhatsApp
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noreferrer"
            className="btn-icon facebook"
          >
            <AiOutlineShareAlt /> Facebook
          </a>
        </div>
      </div>

      {/* 2. Grupo de Aparência */}
      <div className="control-group">
        <div className="group-header">
          <AiOutlineSetting /> <span>Aparência</span>
        </div>

        {/* Tamanho */}
        <div className="control-row">
          <div className="control-item full-width">
            <label>Tamanho: {config.size}px</label>
            <input
              type="range"
              min="150"
              max="450"
              step="10"
              value={config.size}
              onChange={(e) => updateConfig("size", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Estilos */}
        <div className="control-row">
          <div className="control-item">
            <label>Módulos</label>
            <select
              value={config.qrStyle}
              onChange={(e) => updateConfig("qrStyle", e.target.value)}
            >
              <option value="squares">Quadrados</option>
              <option value="dots">Pontos</option>
            </select>
          </div>
          <div className="control-item">
            <label>Olhos</label>
            <select
              value={config.eyeStyle}
              onChange={(e) => updateConfig("eyeStyle", e.target.value)}
            >
              <option value="square">Quadrados</option>
              <option value="circle">Redondos</option>
            </select>
          </div>
        </div>

        {/* [NOVO] Nível de Correção de Erro */}
        <div className="control-row">
          <div className="control-item full-width">
            <label title="Aumente para garantir leitura com logos grandes">
              <AiOutlineSafety style={{ marginRight: 4 }} />
              Margem de Erro
            </label>
            <select
              value={config.ecLevel}
              onChange={(e) => updateConfig("ecLevel", e.target.value)}
            >
              <option value="L">Baixa (L) - Melhor para dados longos</option>
              <option value="M">Média (M)</option>
              <option value="Q">Alta (Q)</option>
              <option value="H">Máxima (H) - Melhor para Logos</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Grupo de Cores */}
      <div className="control-group">
        <div className="group-header">
          <AiOutlineBgColors /> <span>Cores</span>
        </div>
        <div className="color-pickers">
          <div className="color-item">
            <input
              type="color"
              value={config.fgColor}
              onChange={(e) => updateConfig("fgColor", e.target.value)}
              title="Cor do QR Code"
            />
            <label>Frente</label>
          </div>
          <div className="color-item">
            <input
              type="color"
              value={config.bgColor}
              onChange={(e) => updateConfig("bgColor", e.target.value)}
              title="Cor de Fundo"
            />
            <label>Fundo</label>
          </div>
        </div>
      </div>

      {/* 4. Grupo de Logo */}
      <div className="control-group">
        <div className="group-header">
          <AiOutlinePicture /> <span>Logo</span>
        </div>

        <label className="file-upload">
          <span>
            {config.logoImage ? "Alterar Logo" : "Carregar Logo (Opcional)"}
          </span>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </label>

        {config.logoImage && (
          <div className="logo-settings fade-in">
            <div className="control-item">
              <label>Opacidade: {config.logoOpacity}</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.logoOpacity}
                onChange={(e) =>
                  updateConfig("logoOpacity", Number(e.target.value))
                }
              />
            </div>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={config.removeQrCodeBehindLogo}
                onChange={(e) =>
                  updateConfig("removeQrCodeBehindLogo", e.target.checked)
                }
              />
              Remover fundo atrás do logo
            </label>
          </div>
        )}
      </div>
    </section>
  );
};

export default Controls;
