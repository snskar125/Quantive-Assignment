import axios from "axios"

//API Request to Add new Dashboard Item
export const addToDashboard = async(sheetId, tabId, email,token) => {
    const res = await axios.post("/api/dashboard/",{sheetId,tabId,email}, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.data
}

//API Request to get Dashboard Items
export const getDashboardItems = async(token) => {
    const res = await axios.get("/api/dashboard/", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.data
}

//API Request to get Dashboard Stats
export const getDashboardStats = async(token,email,sheetId,tabId) => {
    const res = await axios.post("/api/dashboard/stats",{
        email,tabId,sheetId
    }, 
    {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.data
}