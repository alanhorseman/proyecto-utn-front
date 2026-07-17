import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen'
import { HomeScreen } from './Screens/HomeScreen/HomeScreen'
import { AuthContextProvider } from './context/AuthContext'
import AuthMiddleware from './middlewares/AuthMiddleware'
import AlreadyAuthMiddleware from './middlewares/AlreadyAuthMiddleware'
import VerifyEmailScreen from './Screens/VerifyEmailScreen/VerifyEmailScreen'
import VerifyActionScreen from './Screens/VerifyActionScreen.jsx/VerifyActionScreen'

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<AuthMiddleware/>}>
          <Route path='/home' element={<HomeScreen/>} />
        </Route>
        <Route element={<AlreadyAuthMiddleware/>}>
          <Route path='/' element={<LoginScreen/>} />
          <Route path='/login' element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>} />
          <Route path='/verify-email' element={<VerifyEmailScreen/>} />
        </Route>
        <Route path='/verify' element={<VerifyActionScreen/>} />
        <Route path='/*' element={<Navigate to={'/home'}/>} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
