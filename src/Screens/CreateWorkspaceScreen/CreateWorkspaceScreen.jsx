import React, { useState, useEffect, useRef } from "react";
import "./CreateWorkspaceScreen.css";

const CreateWorkspaceScreen = () => {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [userName, setUserName] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChannelMenu, setShowChannelMenu] = useState(false);

  const messagesEndRef = useRef(null);

  const MAX_WORKSPACE_CHARS = 50;
  const MAX_USER_CHARS = 50;

  useEffect(() => {
    if (step === 3) {
      setMessages([
        {
          id: 1,
          sender: userName || "aedev86",
          text: "se ha unido a #nuevo-canal.",
          isSystem: true,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      const timer = setTimeout(() => {
        setStep(4);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [step, userName])

  useEffect(() => {
    if (step === 4 && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, step]);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && workspaceName.trim() !== "") {
      setStep(2);
    } else if (step === 2 && userName.trim() !== "") {
      setStep(3);
    }
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      sender: userName || "aedev86",
      text: chatInput,
      isSystem: false,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setChatInput("");
  };

  if (step === 3) {
    return (
      <div className="loading-screen-container">
        <div className="loading-box">
          <p className="loading-text">Creando tu espacio de trabajo...</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (step === 4) {
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
  }

  return (
    <div className="slack-container">
      <div className="slack-left-panel">
        <div className="slack-progress">
          <span className={`progress-dash ${step >= 1 ? "active" : ""}`}></span>
          <span className={`progress-dash ${step >= 2 ? "active" : ""}`}></span>
          <span className="progress-dash"></span>
        </div>
        {step === 2 && (
          <button
            type="button"
            className="slack-back-arrow"
            onClick={handleBackStep}
          >
            ← Volver anterior
          </button>
        )}
        <div className="form-slider-mask">
          <div
            className="form-slider-track"
            style={{ transform: `translateX(${step === 1 ? "0%" : "-50%"})` }}
          >
            <div className="form-step-page">
              <h1 className="slack-title">
                Asigna un nombre a tu espacio de trabajo de Slack
              </h1>
              <p className="slack-subtitle">
                Elige algo que tu equipo reconozca fácilmente, como el nombre de
                la empresa o del equipo. Puedes modificarlo cuando quieras.
              </p>

              <form onSubmit={handleNextStep}>
                <div className="slack-input-container">
                  <input
                    type="text"
                    placeholder="P. ej.: Ficciones S. A."
                    maxLength={MAX_WORKSPACE_CHARS}
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="slack-input"
                    autoFocus
                  />
                  <span className="slack-char-counter">
                    {MAX_WORKSPACE_CHARS - workspaceName.length}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={workspaceName.trim() === ""}
                  className={`slack-submit-btn ${workspaceName.trim() !== "" ? "enabled" : ""}`}
                >
                  Continuar
                </button>

                <p className="slack-legal-text">
                  Al crear un espacio de trabajo, declaras que aceptas las
                  Condiciones de servicio y la Política de privacidad.
                </p>
              </form>
            </div>
            <div className="form-step-page">
              <h1 className="slack-title">¿Cómo te llamas?</h1>
              <p className="slack-subtitle">
                Añadir tu nombre y foto de perfil ayuda a otras personas a
                reconocerte y conectar contigo más fácilmente.
              </p>

              <form onSubmit={handleNextStep}>
                <div className="slack-input-container">
                  <input
                    type="text"
                    placeholder="Tu nombre o alias"
                    maxLength={MAX_USER_CHARS}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="slack-input"
                    autoFocus={step === 2}
                  />
                  <span className="slack-char-counter">
                    {MAX_USER_CHARS - userName.length}
                  </span>
                </div>
                <div className="slack-avatar-section">
                  <label className="slack-avatar-label">
                    Añade una foto <span>(optativo)</span>
                  </label>
                  <div className="slack-avatar-wrapper">
                    <div className="slack-avatar-box">
                      <svg
                        viewBox="0 0 24 24"
                        className="avatar-svg-placeholder"
                      >
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

                <button
                  type="submit"
                  disabled={userName.trim() === ""}
                  className="slack-submit-btn enabled"
                >
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="slack-right-panel">
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
      </div>
    </div>
  );
};

export default CreateWorkspaceScreen;