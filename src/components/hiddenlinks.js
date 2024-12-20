export const ShowonLogin = ({children})=>{
    if(sessionStorage.getItem('2ndaug-mini')!=null){
        return children }
    return null
}

export const ShowonLogout = ({children})=>{
    if(sessionStorage.getItem('2ndaug-mini')==null){
        return children   }
    return null
}