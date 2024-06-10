import { createContext, useContext, useState, useEffect } from "react"
import Cookie from "js-cookie"

const AppContext = createContext({})
export const useAppContext = () => useContext(AppContext)

export default function AppProvider(props){

  const [ currentUser, setCurrentUser ] = useState()

  async function verifyUser(){
    const foundCookie = Cookie.get("auth-cookie");
    if (foundCookie){
      const response = await fetch("/api/users/verify");
      const foundUser = await response.json();
      setCurrentUser(foundUser.results)
    }
  }

  useEffect(() => {
    verifyUser()
  },[])

  return(
    <AppContext.Provider value={{ currentUser, setCurrentUser }}>
      { props.children }
    </AppContext.Provider>
  )
}