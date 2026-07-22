import React from 'react';

const MockWindowPreview = ({ workspaceName, userName }) => {
  return (
    <div className="mock-window">
      <div className="mock-rail">
        <div className="mock-rail-ws-icon">
          {workspaceName ? workspaceName.charAt(0).toUpperCase() : "T"}
        </div>
        <div className="mock-rail-item active">
          <div className="mock-icon-dot"></div>
        </div>
        <div className="mock-rail-item"></div>
        <div className="mock-rail-item"></div>
        <div className="mock-rail-bottom-user"></div>
      </div>
      <div className="mock-sidebar">
        <div className="mock-sidebar-header">
          <h3>{workspaceName || "Tu espacio de trabajo"}</h3>
          <span className="arrow-down">▼</span>
        </div>

        <div className="mock-sidebar-content">
          <div className="mock-sidebar-section">
            <span className="section-title">▼ Canales</span>
            <div className="sidebar-item active-item"># proyecto</div>
            <div className="sidebar-item action-item">+ Añadir canales</div>
          </div>

          <div className="mock-sidebar-section">
            <span className="section-title">▼ Mensajes directos</span>
            <div className="sidebar-item user-item">
              <span className="status-dot online"></span>
              <span className="user-name-text">
                {userName || "Tu nombre"}
              </span>
              <span className="you-tag">tú</span>
            </div>
            <div className="sidebar-item user-item offline-user">
              <span className="status-dot offline"></span>
              <span>Tu compañero de equipo</span>
            </div>
            <div className="sidebar-item action-item">
              + Añadir compañeros de equipo
            </div>
          </div>
        </div>
      </div>
      <div className="mock-chat-area">
        <div className="mock-chat-header">
          <span className="hashtag">#</span> <strong>proyecto</strong>
        </div>
        <div className="mock-chat-messages"></div>
        <div className="mock-chat-input-wrapper">
          <div className="mock-input-placeholder">
            Enviar mensaje a #proyecto
          </div>
          <div className="mock-input-actions">
            <span className="mock-tools">+ Aa Aa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockWindowPreview;
