import {createContext} from 'react';
import { useProvideSong } from './ProvideSong';
var initialState={
    song:{},
    track:[],
    setSongAndTrack:()=>{},
    songBack:()=>{},
    songNext:()=>{}
}

export let SongContext = createContext(initialState);

export function SongProvider({children}){
    var record = useProvideSong();
    return (
        <SongContext.Provider value = {record}>
            {children}
        </SongContext.Provider>
    )

}