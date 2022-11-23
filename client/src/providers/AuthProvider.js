import {createContext} from 'react';
import { useProvideAuth } from './ProvideAuth';
var initialState={
    user:null,
    login:()=>{},
    signup:()=>{},
    logout:()=>{},
    favourite:()=>{},
    unfavourite:()=>{},
    setAvatar:()=>{}
}

export let AuthContext = createContext(initialState);

export function AuthProvider({children}){
    var auth = useProvideAuth();
    return (
        <AuthContext.Provider value = {auth}>
            {children}
        </AuthContext.Provider>
    )

}