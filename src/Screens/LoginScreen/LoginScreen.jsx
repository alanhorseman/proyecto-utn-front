import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import useForm from "../../hooks/useForm";
import login, { verifyEmailToken } from "../../services/authServices";
import useRequest from "../../hooks/useRequest";
import { AuthContext } from "../../context/AuthContext";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const { login: syncLogin } = useContext(AuthContext);
  const location = useLocation()
  const navigate = useNavigate();

  const [verification, setVerification] = useState({
    status: location?.state?.status || null,
    message: location?.status?.message || ""
  })

  const {
    sendRequest: sendRequestLogin,
    loading: loginLoading,
    response: loginRes,
    error: loginError,
  } = useRequest();

  const initial_form_state = {
    email: "",
    password: "",
  };

  function onSubmit(formData) {
    sendRequestLogin(() => login(formData.email, formData.password));
  }

  useEffect(() => {
    if (loginRes?.ok) {
      syncLogin(loginRes?.data?.access_token);
      navigate("/home");
    }
  }, [loginRes]);

  useEffect(() => {
    if (location.state) {
      navigate("/login", { replace: true, state: null });
    }
  }, [location, navigate]);

  const { formState, handleChange, handleSubmit } = useForm(
    initial_form_state,
    onSubmit,
  );

  console.log('mensaje de verificacion', verification.message);
  

  return (
    <div className="login-screen">
      {verification.status === "success" && (
        <div className="verification-success">Cuenta verificada exitosamente</div>
      )}

      {verification.status === "error" && (
        <div className="verification-error">No se pudo verificar la cuenta</div>
      )}

      <div className="login-container">
        <div className="logo-container">
          <img
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg"
            alt="Slack Logo"
            className="slack-logo"
          />
        </div>

        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">
          Introduce tu correo electrónico y contraseña para ingresar.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="sr-only">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nombre@work-email.com"
              value={formState.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={formState.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button className="btn-submit">Iniciar sesión</button>
        </form>

        <p className="register-redirect">
          ¿No tienes cuenta? <Link to={"/register"}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
};
