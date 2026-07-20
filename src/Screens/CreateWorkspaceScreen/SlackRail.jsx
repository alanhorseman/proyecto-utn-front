import React from 'react';
import './SlackAppMock/SlackAppMock.css'

const SlackRail = ({ workspaceName, userName }) => {
  return (
    <aside className="workspace-rail">
      <div className="rail-top-icons">
        <div className="rail-ws-badge">
          {workspaceName ? workspaceName.substring(0, 2).toUpperCase() : 'TW'}
        </div>
        <div className="rail-item active">
          <span className="rail-icon">🏠</span>
          <span className="rail-label">Inicio</span>
        </div>
        <div className="rail-item">
          <span className="rail-icon">💬</span>
          <span className="rail-label">Mensajes</span>
        </div>
      </div>
      
      <div className="rail-bottom-icons">
        <div className="rail-action-btn">➕</div>
        <div className="rail-action-btn">🌙</div>
        <div className="rail-user-avatar">
          <span className="avatar-letter">{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
          <span className="user-active-indicator"></span>
        </div>
      </div>
    </aside>
  );
};

export default SlackRail;