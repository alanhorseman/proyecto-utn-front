import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import login from "../../services/authServices";
import useRequest from "../../hooks/useRequest";

export const LoginScreen = () => {
  const navigate = useNavigate()

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
    console.log("intentando loggearse", formData);
    sendRequestLogin(
      () => login(formData.email, formData.password))
  }

  useEffect(
    () => {
      if(loginRes?.ok){
        console.log('Se loggeo bien')
        localStorage.setItem('auth_token', loginRes?.data?.access_token)
        navigate('/home')
      }
    }, [loginRes]
  )

  const { formState, handleChange, handleSubmit } = useForm(
    initial_form_state,
    onSubmit,
  );

  return (
    <div>
      <h1>Iniciar sesion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <button>Iniciar sesion</button>
      </form>
      <p>
        Si no tienes cuenta <Link to={"/register"}>Registrate</Link>
      </p>
    </div>
  );
};
