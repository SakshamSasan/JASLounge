import { AvailContext } from "./AvailProvider";
import { useContext, useEffect, useState } from "react";


export function useAvail(){
    return useContext(AvailContext);
}


export function useProvideAvail(){
    let [id,setId]=useState(null);
    function setIdProvider(data){
        console.log(id,'update hua')
        setId(data)
    }

    return {
        id,
        setIdProvider
    }
}