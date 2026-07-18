import React, { useState } from "react";
import "./ResetPassConfirmScreen.css";
import useForm from "../../hooks/useForm";
import { useNavigate, useSearchParams } from "react-router";
import useRequest from "../../hooks/useRequest";
import { resetPassConfirm } from "../../services/authServices";

export const ResetPassConfirmScreen = () => {
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const reset_token = searchParams("token");

  const initial_form_state = {
    password: "",
    confirm_password: "",
  };

  const {
    sendRequest: sendReqConfirm,
    loading: confirmLoading,
    response: confirmRes,
    error: confirmError,
  } = useRequest();

  function onSubmit(formData) {
    if (formData.password !== formData.confirm_password) {
      setLocalError("las pass no coinciden");
      return;
    }

    if (!reset_token) {
      setLocalError("Falta token");
      return;
    }

    setLocalError(null);
    sendReqConfirm(() => resetPassConfirm(reset_token, formData.password));
  }

  useEffect(() => {
    if (confirmRes?.ok) {
      navigate("/login", {
        state: {
          status: "success",
          message: "Contraseña restablecida correctamente.",
        },
      });
    }
  }, [confirmRes, navigate]);

  const { formState, handleChange, handleSubmit } = useForm(
    initial_form_state,
    onSubmit,
  );
  return (
    <div className="slack-fields-container">
      <div className="slack-fields-card">
        <div className="slack-fields-logo-container">
          <img
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg"
            alt="Slack Logo"
            className="slack-fields-logo-img"
          />
        </div>

        <h1 className="slack-fields-title">Establece tu nueva contraseña</h1>

        <p className="slack-fields-subtitle">
          Elige una contraseña segura que no uses en otros servicios web.
        </p>

        <form onSubmit={handleSubmit} className="slack-fields-form">
          <div className="slack-fields-input-group">
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              placeholder="Nueva contraseña"
              required
              className="slack-fields-input"
            />
          </div>

          <div className="slack-fields-input-group">
            <input
              type="password"
              name="confirm_password"
              value={formState.confirm_password}
              onChange={handleChange}
              placeholder="Confirma tu nueva contraseña"
              required
              className="slack-fields-input"
            />
          </div>

          <button type="submit" className="slack-fields-button">
            Actualizar contraseña
          </button>
        </form>

        <p className="slack-fields-footer-text">
          <a href="#login" className="slack-fields-link">
            Volver al inicio de sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordFields;
