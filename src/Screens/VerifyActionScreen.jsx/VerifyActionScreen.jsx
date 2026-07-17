import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import { verifyEmailToken } from '../../services/authServices'

export const VerifyActionScreen = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('verification_token')

    if (!token) {
      navigate('/login')
      return
    }

    const performVerification = async () => {
      try {
        const res = await verifyEmailToken(token)
        navigate('/login', { 
          state: { status: 'success', message: res.message || 'Cuenta verificada con éxito. Ya podés iniciar sesión.' } 
        })
      } catch (error) {
        navigate('/login', { 
          state: { status: 'error', message: error.message || 'El enlace de verificación no es válido o ya expiró.' } 
        })
      }
    }

    performVerification()
  }, [searchParams, navigate])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h2>Verificando tu cuenta...</h2>
      <p>Por favor, no cierres esta pestaña.</p>
    </div>
  )
}

export default VerifyActionScreen