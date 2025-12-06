import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Como movemos o reset e variáveis globais para o App.css,
// o index.css tornou-se opcional. Se estiver vazio, pode remover a linha abaixo.
// import './index.css';

// Se você não usa reportWebVitals, pode remover também para limpar o código.
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se quiser medir performance:
// reportWebVitals();
