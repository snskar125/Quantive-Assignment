import axios from "axios"

//API Request to get Subscriptions
export const getSubscriptions = async (token) => {
    const subscriptions = await axios.get("/api/subscription/",{
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    return subscriptions.data
}

//API Request to Add new Subscription
export const addNewSubscription = async(data,token) => {

    const tokens = await axios.post("/api/subscription/",{
        authCode : data.code
    },{
        headers : {
            authorization : `Bearer ${token}`
        }
    })
    return tokens
}