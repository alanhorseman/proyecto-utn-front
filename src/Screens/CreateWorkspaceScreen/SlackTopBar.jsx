import React from 'react';
import './SlackAppMock/SlackAppMock.css'

const SlackTopBar = () => {
  return (
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
  );
};

export default SlackTopBar;