import axiosClient from "./axiosClient";
const addToCart = (data)=> axiosClient.post('/carts',{data:data})
const updateCart = (data,documentId)=> axiosClient.put(`/carts/${documentId}`,{data:data})
const getUserCart = (email)=> axiosClient.get(`
carts?populate[products][populate]=banner&filters[email][$eq]=${email}
`)
const deleteCartItem = (documentId)=> axiosClient.delete(`/carts/${documentId}`)

export default {addToCart,getUserCart,deleteCartItem,updateCart}