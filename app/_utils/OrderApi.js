import axiosClient from "./axiosClient";

const addOrder =  (data)=>axiosClient.post('/orders',data)
const getOrder = (email)=> axiosClient.get(
    `orders?populate[products][populate]=banner&filters[email][$eq]=${email}`
    )
export default {addOrder,getOrder}