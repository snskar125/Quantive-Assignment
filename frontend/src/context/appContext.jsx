import { useColorMode } from "@chakra-ui/react";
import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AppReducer from "./appReducer";

const AppContext = createContext()

const initialState = {
    userToken : null,
    subscriptions : [],
    dashboard : []
}

export function AppProvider({children}){
    const {colorMode,toggleColorMode} = useColorMode()
    const [state,dispatch] = useReducer(AppReducer,initialState)
    const navigate = useNavigate()

    useEffect(()=>{
        if(colorMode==="dark") toggleColorMode()
        const initialToken = localStorage.getItem("QUANTIVE_TOKEN")
        if(initialToken){
            dispatch({type:"LOAD_TOKEN",payload:initialToken})
            navigate("/dashboard")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <AppContext.Provider value={{...state,dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext