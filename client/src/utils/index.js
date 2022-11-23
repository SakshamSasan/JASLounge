export const TokenKey = 'jasmusic_key';

export const getItemFromLocalStorage = (key)=>{
    if(!key){
        return console.error('No key found to retrieve token from in getItem')
    }
    return localStorage.getItem(key)
};
export const setItemInLocalStorage = (key,value)=>{

    if(!key||!value){
        return console.error("Can't set item as key/value not found")
    }
    // important line to ensure token is string
    let storeValue = typeof value != "string" ? JSON.stringify(value):value;
    localStorage.setItem(key,storeValue);
};
export const deleteItemFromLocalStorage = (key)=>{

    if(!key){
        return console.error("'Can't delete as no key found")
    }
    localStorage.removeItem(key)
};