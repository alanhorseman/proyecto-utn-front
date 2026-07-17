import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import './VerifyEmailScreen.css'

export const VerifyEmailScreen = () => {
  const location = useLocation()
  const email = location?.state?.email || ''

  return (
    <div className="vs-page">
      <div className="vs-container">
        <header className="vs-header">
          <div className="vs-logo">
            <img className="vs-logo-img" src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" alt="Slack logo" />
          </div>
        </header>

        <main className="vs-main">
          <h1 className="vs-title">Hemos enviado un correo de confirmación</h1>

          <p className="vs-subtitle">
            Se ha enviado un correo de confirmación a {email ? <strong>{email}</strong> : 'tu dirección de correo'}.
            Por favor, revisá tu correo y hacé clic en el enlace de verificación que contiene.
          </p> 
        </main>
      </div>
    </div>
  )
}

export default VerifyEmailScreen
