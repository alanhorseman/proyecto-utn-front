import React from 'react';
import SlackTopBar from '../SlackTopBar';
import SlackRail from '../SlackRail';
import SlackSidebar from '../SlackSidebar';
import SlackChatArea from '../SlackChatArea/SlackChatArea';
import './SlackAppMock.css';

const SlackAppMock = ({ workspaceName, userName, messages, setMessages }) => {
  return (
    <div className="slack-workspace-app">
      <SlackTopBar />
      <div className="workspace-main-layout">
        <SlackRail userName={userName} workspaceName={workspaceName} />
        <SlackSidebar workspaceName={workspaceName} userName={userName} />
        <SlackChatArea userName={userName} messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default SlackAppMock;