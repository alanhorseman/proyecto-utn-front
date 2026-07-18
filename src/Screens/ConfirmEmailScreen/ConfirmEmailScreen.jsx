import React from 'react';
import './ConfirmEmailScreen.css'; // Importación de los estilos CSS independientes

export const ConfirmEmailScreen = ({ email = "aedev86@gmail.com" }) => {
  return (
    <div className="slack-sent-container">
      <div className="slack-sent-card">
        
        {/* Logo de Slack mediante URL externa */}
        <div className="slack-sent-logo-container">
          <img 
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" 
            alt="Slack Logo" 
            className="slack-sent-logo-img"
          />
        </div>

        {/* Título adaptado al cambio de contraseña */}
        <h1 className="slack-sent-title">
          Te hemos mandado un correo para cambiar tu contraseña
        </h1>

        {/* Subtítulo informativo */}
        <p className="slack-sent-subtitle">
          Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
          Haz clic en el enlace del correo electrónico para continuar. Comprueba la carpeta de spam si no aparece en tu bandeja de entrada.
        </p>

        {/* Botones de acceso rápido a servicios de correo */}
        <div className="slack-sent-apps">
          <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="slack-sent-app-link">
            <img src="https://a.slack-edge.com/80543/marketing/img/icons/icon-gmail.png" alt="Gmail" className="slack-sent-app-icon" />
            Abre Gmail
          </a>
          <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer" className="slack-sent-app-link">
            <img src="https://a.slack-edge.com/80543/marketing/img/icons/icon-outlook.png" alt="Outlook" className="slack-sent-app-icon" />
            Abre Outlook
          </a>
        </div>

        {/* Aviso de que ya se puede cerrar la pestaña */}
        <div className="slack-sent-notice-box">
          <p>Ya puedes cerrar esta ventana de forma segura si lo deseas.</p>
        </div>

        {/* Enlaces de soporte inferiores */}
        <div className="slack-sent-footer">
          <p className="slack-sent-footer-text">
            ¿No encuentras el correo? <a href="#retry" className="slack-sent-link">Solicita un nuevo enlace.</a>
          </p>
          <p className="slack-sent-footer-text">
            ¿Estás teniendo problemas? <a href="#help" className="slack-sent-link">Prueba con una URL del espacio de trabajo</a>
          </p>
        </div>

      </div>
    </div>
  );
};
