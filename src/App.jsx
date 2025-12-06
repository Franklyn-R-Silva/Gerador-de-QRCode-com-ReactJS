import { useState } from "react";
import "./App.css";

// Importando os componentes modulares
import Header from "./components/Header";
import QRCodeArea from "./components/QRCodeArea";
import Controls from "./components/Controls";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

function App() {
  // 1. Estado Unificado das Configurações do QR Code
  const [config, setConfig] = useState({
    text: "",
    size: 280, // Tamanho inicial otimizado
    fgColor: "#000000",
    bgColor: "#ffffff",
    ecLevel: "H", // Alta correção de erro para suportar logos
    qrStyle: "squares",
    eyeStyle: "square",
    logoImage: "",
    logoOpacity: 1,
    removeQrCodeBehindLogo: false,
  });

  // 2. Estados de Interface (Tema e Notificações)
  const [theme, setTheme] = useState("light");
  const [notification, setNotification] = useState(null);

  // --- Funções Auxiliares (Lógica de Negócio) ---

  // Exibir notificação
  const showToast = (msg) => setNotification(msg);

  // Atualizar configuração genérica
  const updateConfig = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  // Alternar tema
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Upload de Logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig("logoImage", reader.result);
        showToast("Logo carregado com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Copiar o texto do input (não a imagem)
  const handleCopyText = () => {
    if (config.text) {
      navigator.clipboard.writeText(config.text);
      showToast("Texto copiado para a área de transferência!");
    } else {
      showToast("Digite algum texto primeiro!");
    }
  };

  // Gerar links de compartilhamento social
  const shareTextEncoded = encodeURIComponent(config.text);
  const socialLinks = {
    whatsapp: `https://wa.me/?text=${shareTextEncoded}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareTextEncoded}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareTextEncoded}`,
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* Componente de Notificação (Renderizado condicionalmente) */}
      {notification && (
        <Toast message={notification} onClose={() => setNotification(null)} />
      )}

      {/* Cabeçalho */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="main-content">
        {/* Esquerda: Visualização do QR Code */}
        {/* Nota: O QRCodeArea usa o hook useQRCode internamente para baixar/copiar */}
        <QRCodeArea config={config} showToast={showToast} />

        {/* Direita: Controles de Edição */}
        <Controls
          config={config}
          updateConfig={updateConfig}
          handleLogoUpload={handleLogoUpload}
          socialLinks={socialLinks}
          handleCopyText={handleCopyText}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
