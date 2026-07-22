import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import "./CreateWorkspaceScreen.css";
import useRequest from "../../hooks/useRequest";
import { createWorkspace } from "../../services/workspaceServices";

import StepWorkspaceName from "./components/StepWorkspaceName";
import StepUserName from "./components/StepUserName";
import WorkspaceLoader from "./components/WorkspaceLoader";
import SlackWorkspaceApp from "./components/SlackWorkspaceApp";
import MockWindowPreview from "./components/MockWindowPreview";

const CreateWorkspaceScreen = () => {
  const location = useLocation();
  const [step, setStep] = useState(location?.state?.step || 1);
  const [workspaceName, setWorkspaceName] = useState(location?.state?.workspaceName || "");
  const [userName, setUserName] = useState(location?.state?.userName || "");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showChannelMenu, setShowChannelMenu] = useState(false);

  const messagesEndRef = useRef(null);

  const MAX_WORKSPACE_CHARS = 50;
  const MAX_USER_CHARS = 50;

  const {
    sendRequest: sendCreateWorkspace,
    response: createRes,
    error: createError,
  } = useRequest();

  useEffect(() => {
    if (step === 3) {
      sendCreateWorkspace(() => createWorkspace(workspaceName));
    }
  }, [step]);

  useEffect(() => {
    if (createRes?.ok) {
      setMessages([
        {
          id: 1,
          sender: userName || "usuario",
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
  }, [createRes, userName]);

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
      sender: userName || "usuario",
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
    return <WorkspaceLoader createError={createError} setStep={setStep} />;
  }

  if (step === 4) {
    return (
      <SlackWorkspaceApp
        workspaceName={workspaceName}
        userName={userName}
        showChannelMenu={showChannelMenu}
        setShowChannelMenu={setShowChannelMenu}
        messages={messages}
        messagesEndRef={messagesEndRef}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
      />
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
            <StepWorkspaceName
              workspaceName={workspaceName}
              setWorkspaceName={setWorkspaceName}
              handleNextStep={handleNextStep}
              MAX_WORKSPACE_CHARS={MAX_WORKSPACE_CHARS}
            />
            <StepUserName
              userName={userName}
              setUserName={setUserName}
              handleNextStep={handleNextStep}
              MAX_USER_CHARS={MAX_USER_CHARS}
              step={step}
            />
          </div>
        </div>
      </div>
      <div className="slack-right-panel">
        <MockWindowPreview workspaceName={workspaceName} userName={userName} />
      </div>
    </div>
  );
};

export default CreateWorkspaceScreen;
