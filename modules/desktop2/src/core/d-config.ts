import { isDevEnv } from "./web2share-copy/env"
import path from 'path'

// CONFIG
export const cfg_getRootFolder = ()=>{
    return isDevEnv()? path.join(__dirname, "..", ".."):path.join(__dirname)
}

// CLIENT
export const cfg_getAppMainHost = ()=>{
    return isDevEnv() ? 'http://localhost:5173' : 'http://localhost:5173'
}
export const cfg_getAppClientEntryPage = ()=>{
    return cfg_getAppMainHost()+'/setup'
}

// LOCAL
export const cfg_getAppLocalHost = ()=>{
    return isDevEnv() ? 'http://localhost:20167' : 'http://localhost:20167'
}
export const cfg_getAppLocalPage = ()=>{
    return cfg_getAppLocalHost()+'/setup'
}