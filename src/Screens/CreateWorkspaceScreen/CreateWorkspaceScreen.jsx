import React, { useState, useEffect } from 'react';
import StepWorkspaceName from './StepWorkspaceName';
import StepUserName from './StepUserName';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import SlackAppMock from './SlackAppMock/SlackAppMock';
import './CreateWorkspaceScreen.css';

const CreateWorkspaceScreen = () => {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState('');
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (step === 3) {
      setMessages([
        {
          id: 1,
          sender: userName || 'aedev86',
          text: 'se ha unido a #nuevo-canal.',
          isSystem: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      const timer = setTimeout(() => {
        setStep(4);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, userName]);

  if (step === 3) return <LoadingScreen />;
  if (step === 4) {
    return (
      <SlackAppMock 
        workspaceName={workspaceName} 
        userName={userName} 
        messages={messages} 
        setMessages={setMessages} 
      />
    );
  }

  return (
    <div className="slack-container">
      <div className="slack-left-panel">
        <div className="slack-progress">
          <span className={`progress-dash ${step >= 1 ? 'active' : ''}`}></span>
          <span className={`progress-dash ${step >= 2 ? 'active' : ''}`}></span>
          <span className="progress-dash"></span>
        </div>

        {step === 2 && (
          <button type="button" className="slack-back-arrow" onClick={() => setStep(1)}>
            ← Volver anterior
          </button>
        )}

        <div className="form-slider-mask">
          <div 
            className="form-slider-track" 
            style={{ transform: `translateX(${step === 1 ? '0%' : '-50%'})` }}
          >
            <StepWorkspaceName 
              workspaceName={workspaceName} 
              setWorkspaceName={setWorkspaceName} 
              onNext={() => setStep(2)} 
            />
            <StepUserName 
              userName={userName} 
              setUserName={setUserName} 
              onNext={() => setStep(3)} 
            />
          </div>
        </div>
      </div>

      <div className="slack-right-panel">
        <div className="mock-window">
          <div className="mock-rail">
            <div className="mock-rail-ws-icon">
              {workspaceName ? workspaceName.charAt(0).toUpperCase() : 'T'}
            </div>
            <div className="mock-rail-item active"><div className="mock-icon-dot"></div></div>
            <div className="mock-rail-item"></div>
            <div className="mock-rail-item"></div>
            <div className="mock-rail-bottom-user"></div>
          </div>

          <div className="mock-sidebar">
            <div className="mock-sidebar-header">
              <h3>{workspaceName || 'Tu espacio de trabajo'}</h3>
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
                  <span className="user-name-text">{userName || 'Tu nombre'}</span>
                  <span className="you-tag">tú</span>
                </div>
                <div className="sidebar-item user-item offline-user">
                  <span className="status-dot offline"></span>
                  <span>Tu compañero de equipo</span>
                </div>
                <div className="sidebar-item action-item">+ Añadir compañeros de equipo</div>
              </div>
            </div>
          </div>

          <div className="mock-chat-area">
            <div className="mock-chat-header"><span className="hashtag">#</span> <strong>proyecto</strong></div>
            <div className="mock-chat-messages"></div>
            <div className="mock-chat-input-wrapper">
              <div className="mock-input-placeholder">Enviar mensaje a #proyecto</div>
              <div className="mock-input-actions"><span className="mock-tools">+ Aa Aa</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspaceScreen;