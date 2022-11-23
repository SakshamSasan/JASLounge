import { AuthContext } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { deleteItemFromLocalStorage, getItemFromLocalStorage, setItemInLocalStorage, TokenKey } from "../utils";
import { MdSettingsBackupRestore } from "react-icons/md";
import { useAvail } from "./ProvideAvail";
export function useAuth(){
    return useContext(AuthContext)
}
export function useProvideAuth(){
    var avail = useAvail();
    var [user,setUser] = useState(null);
    

    useEffect(()=>{
        const token = getItemFromLocalStorage(TokenKey);
        if(token){
            setUser(jwt_decode(token))
            avail.setIdProvider(jwt_decode(token)._id)
        }
    },[])
    
    const login = async(data)=>{
        
        let url = process.env.REACT_APP_API + "/signin"
        console.log(url,'hai')
        try{
            let res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            let token = await res.json();
            setItemInLocalStorage(TokenKey,token.data.token)
            var user_details = jwt_decode(token.data.token)
            setUser(user_details)
            debugger;
            avail.setIdProvider(user_details._id)
            return {success:true}
        }catch(err){
            console.log('!!Error',err)
            return {sucess:false,message:err}
        }
        
    };
   
    const signup = async (data)=>{
        let url = process.env.REACT_APP_API +  "/signup"
        
        try{
            let res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            let token = await res.json();
            setItemInLocalStorage(TokenKey,token.data.token)
            const user_details = jwt_decode(token.data.token)
            setUser(user_details)
            avail.setIdProvider(user_details._id)
            return {success:true}
        }catch(err){
            console.log('!!Error',err)
            return {sucess:false,message:err}
        }
    };

    const logout = async()=>{
        

        try{

            //Since JWT is sessionless authentication, calling server is useless
            
            deleteItemFromLocalStorage(TokenKey)
            
            setUser(null)
            
            avail.setIdProvider(null)
        }catch(err){
            console.log('!!Error in signing out',err)
        }

        
        
    };

    //To add favourite
    const favourite = async (song)=>{
        try{
            let url = process.env.REACT_APP_API + '/favourite'
            let reply = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${getItemFromLocalStorage(TokenKey)}`
                },
                body:JSON.stringify(song)
            })
            let token = await reply.json()
            console.log(token,'hai favourites ka')
            setItemInLocalStorage(TokenKey,token.data.token);
            const user_details = jwt_decode(token.data.token)
            setUser(user_details)
        }catch(err){
            console.log('!!!Error in favouriting',err)
        }
    }

    //To remove unfavourite

    const unfavourite = async (song)=>{
        try{
            let url = process.env.REACT_APP_API + '/unfavourite'
            let reply = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${getItemFromLocalStorage(TokenKey)}`
                },
                body:JSON.stringify(song)
            })
            let token = await reply.json()
            setItemInLocalStorage(TokenKey,token.data.token);
            const user_details = jwt_decode(token.data.token)
            setUser(user_details)
        }catch(err){
            console.log('!!!Error in unavouriting',err)
        }
    }

    //to set Avatar and rest of form data
    const setAvatar = async (data)=>{
        let url = process.env.REACT_APP_API + '/avatar'
        try{
            let reply = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${getItemFromLocalStorage(TokenKey)}`
                },
                body: JSON.stringify(data)
            })
            let token = await reply.json()
            setItemInLocalStorage(TokenKey,token.data.token);
            const user_details = jwt_decode(token.data.token)
            setUser(user_details)
            return {success:true}
        }catch(err){
            console.log('Error in updating user profile',err)
        }
    }

    return ({
        user,
        login,
        signup,
        logout,
        favourite,
        unfavourite,
        setAvatar
    })
}
