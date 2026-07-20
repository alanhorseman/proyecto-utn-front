import React from 'react';
import './CreateWorkspaceScreen.css'

const StepUserName = ({ userName, setUserName, onNext }) => {
  const MAX_CHARS = 50;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== '') onNext();
  };

  return (
    <div className="form-step-page">
      <h1 className="slack-title">¿Cómo te llamas?</h1>
      <p className="slack-subtitle">
        Añadir tu nombre y foto de perfil ayuda a otras personas a reconocerte y conectar contigo más fácilmente.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="slack-input-container">
          <input
            type="text"
            placeholder="Tu nombre o alias"
            maxLength={MAX_CHARS}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="slack-input"
            autoFocus
          />
          <span className="slack-char-counter">{MAX_CHARS - userName.length}</span>
        </div>

        <div className="slack-avatar-section">
          <label className="slack-avatar-label">Añade una foto <span>(optativo)</span></label>
          <div className="slack-avatar-wrapper">
            <div className="slack-avatar-box">
              <svg viewBox="0 0 24 24" className="avatar-svg-placeholder">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
              </svg>
            </div>
            <div className="slack-avatar-upload-badge">
              <svg viewBox="0 0 24 24" className="upload-svg">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
              </svg>
            </div>
          </div>
        </div>

        <button type="submit" disabled={userName.trim() === ''} className="slack-submit-btn enabled">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default StepUserName;