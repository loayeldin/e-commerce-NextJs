import axiosClient from "./axiosClient";

const addOrder =  (data)=>axiosClient.post('/orders',data)
export default {addOrder}