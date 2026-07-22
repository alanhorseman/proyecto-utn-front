import React from 'react';

const WorkspaceLoader = ({ createError, setStep }) => {
  return (
    <div className="loading-screen-container">
      <div className="loading-box">
        {createError ? (
          <>
            <p className="loading-text error-text" style={{ color: '#e01e5a', marginBottom: '15px' }}>
              Error al crear el espacio de trabajo:
            </p>
            <p className="loading-text" style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>
              {createError}
            </p>
            <button 
              type="button"
              className="slack-submit-btn enabled" 
              onClick={() => setStep(1)}
              style={{ width: 'auto', padding: '10px 20px', cursor: 'pointer' }}
            >
              Volver a intentar
            </button>
          </>
        ) : (
          <>
            <p className="loading-text">Creando tu espacio de trabajo...</p>
            <div className="loading-spinner"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkspaceLoader;
