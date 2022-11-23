import { SongContext } from "./SongProvider";
import { useContext, useEffect, useState } from "react";


export function useSong(){
    return useContext(SongContext);
}


export function useProvideSong(){
    
    var [song,setSongGlobally] = useState({});
    var [track,setTrackGlobally] = useState([])
    
   
    function setSongAndTrack(arr,item){
        setSongGlobally(item)
        console.log('pe gaya siyappa 2',arr,item)
        setTrackGlobally(arr)
        return {success:true}
    }

    function songBack(){
        var index = track.findIndex((elem)=>elem.songURL==song.songURL)
        console.log(track,'hai',song,'hai',index)
        if(index==0){
            setSongGlobally(track[track.length-1])
        }
        else {
            setSongGlobally(track[--index])
        }
        
    }

    function songNext(){
        var index = track.findIndex((elem)=>elem.songURL==song.songURL)
        console.log(track,'hai',song,'hai',index)
        if(index==track.length-1){
            setSongGlobally(track[0])
            
        }
        else {
            setSongGlobally(track[++index])
        }
       
    }

    return {
        song,
        track,
        setSongAndTrack,
        songBack,
        songNext
    }
}