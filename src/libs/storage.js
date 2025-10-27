import { useEffect, useState } from "react";

function load(key) {
    let _storage = localStorage.getItem(key)  
    if(!_storage)return null          
    return JSON.parse(_storage) 
}
export function loadStorage(keys) {  
    
    return keys.reduce((obj,key)=>{
        obj[key] = load(key)    
        return obj
    },{})
}


export function setStorage(key,value) {
   
    value = JSON.stringify(value)
    localStorage.setItem(key,value)
   
}



