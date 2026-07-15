import ENVIRONMENT from "../config/environment.js"

async function login(email, password) {
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

export default login