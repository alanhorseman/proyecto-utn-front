import { useEffect, useState } from 'react'
import './RegisterScreen.css'
import { useNavigate } from 'react-router'
import useRequest from '../../hooks/useRequest'
import { register } from '../../services/authServices'
import useForm from '../../hooks/useForm'

export const RegisterScreen = () => {
  const initial_form_state = {
    name: "",
    email: "",
    password: ""
  }

  const navigate = useNavigate()

  const {
    sendRequest: sendRequestRegister,
    error: registerError,
    response: registerRes,
    loading: registerLoading
  } = useRequest()

  function onSubmit(formData){
    sendRequestRegister(
      () => register(formData.name, formData.email, formData.password)
    )
  }

  useEffect(() => {
    if(registerRes?.ok){
      navigate('/verify-email', {
        state: {email: registerRes?.data?.user.email}
      })
    }
  }, [registerRes])

  const { formState, handleChange, handleSubmit} = useForm(initial_form_state, onSubmit)

  return (
    <div className="rs-page">
      <div className="rs-container">
        <header className="rs-header">
          <div className="rs-logo">
            <img className="rs-logo-img" src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="Slack logo" />
          </div>
        </header>

        <main className="rs-main">
          <h1 className="rs-title">Crea tu cuenta</h1>
          <p className="rs-subtitle">Introduce tu nombre, correo electrónico y contraseña para crear tu cuenta.</p>

          <form className="rs-form" onSubmit={handleSubmit}>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={formState.name}
              onChange={handleChange}
              className="rs-input"
              required
            />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@work-email.com"
              value={formState.email}
              onChange={handleChange}
              className="rs-input"
              required
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formState.password}
              onChange={handleChange}
              className="rs-input"
              required
            />

            <button className="rs-button" type="submit">Crear cuenta</button>
          </form>

          <div className="rs-footer-link">
            <a href="#">¿Ya tenés cuenta? Iniciar sesión</a>
          </div>
        </main>
      </div>
    </div>
  )
}
