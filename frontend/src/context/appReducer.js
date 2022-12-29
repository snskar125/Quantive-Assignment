export default function AppReducer(state,action){
    switch(action.type){
        case "LOAD_TOKEN" : {
            return {...state,userToken:action.payload}
        }
        case "LOAD_SUBSCRIPTIONS": {
            return { ...state, subscriptions: action.payload }
        }
        case "LOAD_DASHBOARD" : {
            return {...state, dashboard : action.payload}
        }
        default : {
            return state
        }
    }
}