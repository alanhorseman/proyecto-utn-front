import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";


function AlreadyAuthMiddleware (){
  const {isLogged} = useContext(AuthContext)

  if(!isLogged){
    // son como los next() en los middle
    return <Outlet/>
  } else {
    return <Navigate to={'/home'} />
  }
}

export default AlreadyAuthMiddleware;