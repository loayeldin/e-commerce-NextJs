const { default: axiosClient } = require("./axiosClient")

const getProductsList = ()=>axiosClient.get('/products?populate=*')
const getProductById = (documentId)=>axiosClient.get(`/products/${documentId}?populate=*`)
const getSimilarProductsByCat = (category)=> axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`)
export default{
    getProductsList,
    getProductById,
    getSimilarProductsByCat
}