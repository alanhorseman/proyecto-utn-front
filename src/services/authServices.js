import ENVIRONMENT from "../config/environment.js"

export default async function login(email, password) {
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  const res = await res_http.json()
  if (!res.ok) {
    throw new Error(res.message)
  }

  return res
}

export async function register (name, email, password) {
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
  const res = await res_http.json()
  if(!res.ok){
    throw new Error(res.message)
  }

  return res
}

export async function verifyEmailToken(token) {
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/auth/verify-email?verification_token=' + token, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const res = await res_http.json()
  if(!res.ok){
    throw new Error(res.message)
  }

  return res
}

export async function resetPassRequest(email){
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/auth/reset-password-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  })
  const res = await res_http.json()
  if(!res.ok){
    throw new Error(res.message)
  }

  return res
}

export async function resetPassConfirm(new_password, token){
  const res_http = await fetch(ENVIRONMENT.URL_API + '/api/auth/reset-password-confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      new_password: new_password
    })
  })
  const res = await res_http.json()
  if(!res.ok){
    throw new Error(res.message)
  }

  return res
}