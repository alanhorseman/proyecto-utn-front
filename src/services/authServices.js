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