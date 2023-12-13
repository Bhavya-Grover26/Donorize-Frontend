export const initialState = null

export const reducer = (state,action)=>{
    if(action.type==="USER"){
        return action.payload
    }
    if(action.type ==="CLEAR"){
        console.log("Logging out")
        return null
    }
    return state
}