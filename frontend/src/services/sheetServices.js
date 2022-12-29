import axios from "axios"

//API Request to get Sheets
export const getSheets = async (token,email) => {
    const subscriptions = await axios.post("/api/sheet/",{email}, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return subscriptions.data
}


//API Request to get Tabs by Sheet Id
export const getTabs = async (token, email, sheetId) => {
    const subscriptions = await axios.post("/api/sheet/tabs", { email,sheetId }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return subscriptions.data
}