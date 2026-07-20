import React, { useState, useRef, useEffect } from 'react';
import './SlackChatArea.css';

const SlackChatArea = ({ userName, messages, setMessages }) => {
  const [chatInput, setChatInput] = useState('');
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      sender: userName || 'aedev86',
      text: chatInput,
      isSystem: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setChatInput('');
  };

  return (
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
            <div className="channel-context-menu" onClick={(e) => e.stopPropagation()}>
              <div className="menu-item">Información del canal</div>
              <div className="menu-divider"></div>
              <div className="menu-item danger">Abandonar canal</div>
            </div>
          )}
        </div>
      </header>

      <div className="chat-messages-area">
        <div className="welcome-chat-card">
          <h1 className="welcome-chat-title">👋 ¡Te damos la bienvenida a tu primer canal {userName || 'aedev86'}!</h1>
          <p className="welcome-chat-subtitle">
            Los canales de Slack permiten concentrarse en el trabajo relacionado con un tema específico. Puedes mantener toda la información relacionada con los proyectos vinculada al canal para que todo el mundo pueda acceder.
          </p>
        </div>

        <div className="chat-date-divider">
          <span className="date-tag">Hoy ▼</span>
        </div>

        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-row ${msg.isSystem ? 'system-msg' : ''}`}>
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
              className={`send-msg-btn ${chatInput.trim() !== '' ? 'active' : ''}`}
              disabled={chatInput.trim() === ''}
            >
              ➤
            </button>
          </div>
        </form>
      </footer>
    </main>
  );
};

export default SlackChatArea;