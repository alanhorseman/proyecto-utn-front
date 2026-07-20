import React from 'react';
import './SlackAppMock/SlackAppMock.css'

const SlackSidebar = ({ workspaceName, userName }) => {
  return (
    <aside className="workspace-sidebar">
      <div className="sidebar-header-clean">
        <h2 className="sidebar-ws-title">{workspaceName || 'test-workspace'}</h2>
      </div>

      <div className="sidebar-scrollable-content">
        <div className="sidebar-group">
          <div className="group-title">▼ Canales</div>
          <div className="group-item"># general-{workspaceName.toLowerCase().replace(/\s+/g, '-')}</div>
          <div className="group-item active-channel"># nuevo-canal</div>
          <div className="group-item"># redes-sociales</div>
          <div className="group-item add-action">+ Añadir canales</div>
        </div>

        <div className="sidebar-group">
          <div className="group-title">▼ Mensajes directos</div>
          <div className="group-item user-me">
            <span className="active-dot"></span>
            <span className="user-name-span">{userName || 'aedev86'}</span>
            <span className="me-tag">tú</span>
          </div>
          <div className="group-item add-action">+ Invitar a otros</div>
        </div>
      </div>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">Slack es mejor si se combina.</p>
        <button className="sidebar-footer-btn">👥 Invita a compañeros de equipo</button>
      </div>
    </aside>
  );
};

export default SlackSidebar;