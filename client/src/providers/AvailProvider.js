import {createContext} from 'react';
import { useProvideAvail } from './ProvideAvail';
var initialState={
    id:null,
    setIdProvider:()=>{}
}

export let AvailContext = createContext(initialState);

export function AvailProvider({children}){
    var record = useProvideAvail();
    return (
        <AvailContext.Provider value = {record}>
            {children}
        </AvailContext.Provider>
    )

}