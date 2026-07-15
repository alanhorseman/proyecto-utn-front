import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


export const HomeScreen = () => {

  const {isLogged} = useContext(AuthContext)
  return (
    <div>HomeScreen</div>
  )
}
