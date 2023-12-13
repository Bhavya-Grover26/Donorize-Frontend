export const initialState = null

export const reducer = (state,action)=>{
    if(action.type==="ORG"){
        return action.payload
    }
    if(action.type ==="CLEAR"){
        console.log("Logging out")
        return null
    }
    return state;
}