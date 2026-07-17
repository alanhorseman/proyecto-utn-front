import React, { useEffect, useState } from 'react';
import './ResetPassReqScreen.css';
import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
import { resetPassRequest } from '../../services/authServices';
import { useNavigate } from 'react-router';

export const ResetPassReq = () => {
  const navigate = useNavigate()
  const {
    sendRequest: sendRequestResetPass,
    loading: reqResPassLoading,
    response: reqResPassRes,
    error: reqResPassError
  } = useRequest()
  
  initial_form_state = {
    email: ""
  }

  function onSubmit(formData){
    sendRequestResetPass(() => resetPassRequest(formData.email)); 
  }

  useEffect(() => {
    if(reqResPassRes?.ok){
      navigate('/confirm-email', )
      /// state email
    }
  }, [])

  const {formState, handleChange, handleSubmit} = useForm(initial_form_state, onSubmit)

  return (
    <div className="slack-container">
      <div className="slack-card">
        
        <div className="slack-logo-container">
          <img 
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" 
            alt="Slack Logo" 
            className="slack-logo-img"
          />
        </div>

        <h1 className="slack-title">Restablecer contraseña</h1>

        <p className="slack-subtitle">
          Introduce tu correo electrónico para recibir las instrucciones de recuperación.
        </p>

        <form onSubmit={handleSubmit} className="slack-form">
          <div className="slack-input-group">
            <input
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="nombre@work-email.com"
              required
              className="slack-input"
            />
          </div>

          <button type="submit" className="slack-button">
            Enviar enlace
          </button>
        </form>

        <p className="slack-footer-text">
          ¿Recordaste tu contraseña?{' '}
          <a href="#login" className="slack-link">
            Iniciar sesión
          </a>
        </p>

      </div>
    </div>
  );
};
