import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import './VerifyEmailScreen.css'

export const VerifyEmailScreen = () => {
  const location = useLocation()
  const email = location?.state?.email || ''

  useEffect(() => {
    // Aquí se puede iniciar un polling para comprobar el estado de verificación
    // Por ahora sólo mostramos la pantalla informativa como solicitaste.
  }, [])

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

          <p className="vs-note">
            No cierres esta ventana — la página se actualizará automáticamente cuando el correo sea verificado.
          </p>

          <div className="vs-waiting">
            <div className="vs-spinner" aria-hidden="true">🔄</div>
            <div className="vs-waiting-text">Esperando verificación...</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default VerifyEmailScreen
