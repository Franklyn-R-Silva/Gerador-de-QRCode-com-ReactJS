// src/components/generator/ColorPickerAdvanced.jsx
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AiOutlineBgColors, AiOutlineClose } from "react-icons/ai";
import "./ColorPickerAdvanced.css";

const ColorPickerAdvanced = ({ label, color, onChange, presets = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultPresets = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#ffeaa7",
    "#dfe6e9",
    "#a29bfe",
  ];

  const colorPresets = presets.length > 0 ? presets : defaultPresets;

  return (
    <div className="color-picker-advanced">
      <label className="color-label">{label}</label>

      <div className="color-preview-container">
        <button
          className="color-preview-button"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Selecionar ${label}`}
        >
          <span className="color-value">{color}</span>
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="color-picker-overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="color-picker-popover">
            <div className="color-picker-header">
              <AiOutlineBgColors />
              <span>{label}</span>
              <button
                onClick={() => setIsOpen(false)}
                className="color-picker-close"
                aria-label="Fechar"
              >
                <AiOutlineClose />
              </button>
            </div>

            <div className="color-picker-content">
              <HexColorPicker color={color} onChange={onChange} />

              <div className="color-input-group">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="#000000"
                  className="color-hex-input"
                />
              </div>

              <div className="color-presets">
                <span className="presets-label">Pré-definidas:</span>
                <div className="presets-grid">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset}
                      className="preset-button"
                      style={{ backgroundColor: preset }}
                      onClick={() => onChange(preset)}
                      title={preset}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPickerAdvanced;
