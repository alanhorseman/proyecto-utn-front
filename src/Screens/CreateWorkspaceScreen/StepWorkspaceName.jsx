import React from 'react';
import './CreateWorkspaceScreen.css'

const StepWorkspaceName = ({ workspaceName, setWorkspaceName, onNext }) => {
  const MAX_CHARS = 50;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (workspaceName.trim() !== '') onNext();
  };

  return (
    <div className="form-step-page">
      <h1 className="slack-title">Asigna un nombre a tu espacio de trabajo de Slack</h1>
      <p className="slack-subtitle">
        Elige algo que tu equipo reconozca fácilmente, como el nombre de la empresa o del equipo. Puedes modificarlo cuando quieras.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="slack-input-container">
          <input
            type="text"
            placeholder="P. ej.: Ficciones S. A."
            maxLength={MAX_CHARS}
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="slack-input"
            autoFocus
          />
          <span className="slack-char-counter">{MAX_CHARS - workspaceName.length}</span>
        </div>

        <button
          type="submit"
          disabled={workspaceName.trim() === ''}
          className={`slack-submit-btn ${workspaceName.trim() !== '' ? 'enabled' : ''}`}
        >
          Continuar
        </button>

        <p className="slack-legal-text">
          Al crear un espacio de trabajo, declaras que aceptas las Condiciones de servicio y la Política de privacidad.
        </p>
      </form>
    </div>
  );
};

export default StepWorkspaceName;