import { createContext, useState , useEffect} from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListner } from "../utils/firebase/firebase.utils";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    
    const [currentUser, setCurrentUser ] = useState(null)
    
    useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => 
        {if(user) createUserDocumentFromAuth(user)
        setCurrentUser(user)}
    )

    return unsubscribe
    }, [])

    return(
        <UserContext.Provider value={{currentUser, setCurrentUser}} >
            {children}
        </UserContext.Provider>
    )
}