import React from 'react';

const SlackWorkspaceApp = ({ 
  workspaceName, 
  userName, 
  showChannelMenu, 
  setShowChannelMenu, 
  messages, 
  messagesEndRef, 
  chatInput, 
  setChatInput, 
  handleSendMessage 
}) => {
  return (
    <div className="slack-workspace-app">
      <header className="workspace-top-bar">
        <div className="top-bar-left">
          <span className="nav-arrow disabled">←</span>
          <span className="nav-arrow disabled">→</span>
          <span className="history-icon">🕒</span>
        </div>
        <div className="top-bar-right">
          <span className="help-icon">❓</span>
        </div>
      </header>

      <div className="workspace-main-layout">
        <aside className="workspace-rail">
          <div className="rail-top-icons">
            <div className="rail-ws-badge">
              {workspaceName
                ? workspaceName.substring(0, 2).toUpperCase()
                : "TW"}
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
              <span className="avatar-letter">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </span>
              <span className="user-active-indicator"></span>
            </div>
          </div>
        </aside>

        <aside className="workspace-sidebar">
          <div className="sidebar-header-clean">
            <h2 className="sidebar-ws-title">
              {workspaceName || "test-workspace"}
            </h2>
          </div>

          <div className="sidebar-scrollable-content">
            <div className="sidebar-group">
              <div className="group-title">▼ Canales</div>
              <div className="group-item">
                # general-{workspaceName.toLowerCase().replace(/\s+/g, "-")}
              </div>
              <div className="group-item active-channel"># nuevo-canal</div>
              <div className="group-item"># redes-sociales</div>
              <div className="group-item add-action">+ Añadir canales</div>
            </div>

            <div className="sidebar-group">
              <div className="group-title">▼ Mensajes directos</div>
              <div className="group-item user-me">
                <span className="active-dot"></span>
                <span className="user-name-span">
                  {userName || "aedev86"}
                </span>
                <span className="me-tag">tú</span>
              </div>
              <div className="group-item add-action">+ Invitar a otros</div>
            </div>
          </div>

          <div className="sidebar-footer">
            <p className="sidebar-footer-text">
              Slack es mejor si se combina.
            </p>
            <button className="sidebar-footer-btn">
              👥 Invita a compañeros de equipo
            </button>
          </div>
        </aside>

        <main className="workspace-chat-container">
          <header className="chat-header">
            <div
              className="chat-header-title-container"
              onClick={() => setShowChannelMenu(!showChannelMenu)}
            >
              <span className="header-hashtag">#</span>
              <h3 className="header-channel-name">nuevo-canal</h3>
              <span className="header-dropdown-arrow">▼</span>
              {showChannelMenu && (
                <div
                  className="channel-context-menu"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="menu-item">Información del canal</div>
                  <div className="menu-divider"></div>
                  <div className="menu-item danger">Abandonar canal</div>
                </div>
              )}
            </div>
          </header>
          <div className="chat-messages-area">
            <div className="welcome-chat-card">
              <h1 className="welcome-chat-title">
                👋 ¡Te damos la bienvenida a tu primer canal{" "}
                {userName || "aedev86"}!
              </h1>
              <p className="welcome-chat-subtitle">
                Los canales de Slack permiten concentrarse en el trabajo
                relacionado con un tema específico. Puedes mantener toda la
                información relacionada con los proyectos vinculada al canal
                para que todo el mundo pueda acceder.
              </p>
            </div>
            <div className="chat-date-divider">
              <span className="date-tag">Hoy ▼</span>
            </div>
            <div className="messages-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-row ${msg.isSystem ? "system-msg" : ""}`}
                >
                  <div className="message-avatar">
                    {msg.sender.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="message-content">
                    <div className="message-meta">
                      <span className="message-sender">{msg.sender}</span>
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <p className="message-text">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <footer className="chat-input-area">
            <form onSubmit={handleSendMessage} className="chat-input-box">
              <div className="chat-editor-tools">
                <span>B</span>
                <span>I</span>
                <span className="strike">S</span>
                <span>🔗</span>
                <span>⋮=</span>
                <span>1.=</span>
                <span>&lt;/&gt;</span>
              </div>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Enviar un mensaje a #nuevo-canal"
                className="chat-text-input"
              />
              <div className="chat-editor-footer">
                <div className="chat-editor-left-actions">
                  <span className="action-circle">➕</span>
                  <span className="action-circle">😊</span>
                  <span className="action-circle">@</span>
                  <span className="action-circle">📹</span>
                  <span className="action-circle">🎙️</span>
                </div>
                <button
                  type="submit"
                  className={`send-msg-btn ${chatInput.trim() !== "" ? "active" : ""}`}
                  disabled={chatInput.trim() === ""}
                >
                  ➤
                </button>
              </div>
            </form>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default SlackWorkspaceApp;
