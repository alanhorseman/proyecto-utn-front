import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router"

export const HomeScreen = () => {

  const {isLogged, logout} = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    navigate('/login')
  }
  return (
    <div>
      <h1>HomeScreen</h1>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </div>
  )
}
