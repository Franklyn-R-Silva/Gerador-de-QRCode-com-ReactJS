import React from "react";
import "./Footer.css"; // Vamos criar abaixo

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>
        Desenvolvido por <strong>Franklyn Silva</strong> &copy;{" "}
        {new Date().getFullYear()}
      </p>
      <div className="footer-links">
        <a
          href="https://github.com/Franklyn-R-Silva"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/franklyn-roberto-dev/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
