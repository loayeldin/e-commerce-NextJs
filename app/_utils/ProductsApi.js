const { default: axiosClient } = require("./axiosClient")
const getProductsList = async( 
  category ,
   search,
   range,
  pagination
  ) => {

        let query = "/products?populate=*";
    
        // Add filters conditionally
        if (category) {
          query += `&filters[category][$eq]=${category}`;
        }
    
        if (search) {
          query += `&filters[title][$containsi]=${search}`;
        }
        if(range?.length){
            query += `&filters[price][$gte]=${range[0]}&&filters[price][$lte]=${range[1]}`;
        }
        if(pagination){
          query +=`&pagination[start]=${pagination.pageStart}&pagination[limit]=${pagination.pageLimit}`
        }
    
        return axiosClient.get(query);
   
  };
const getProductById = (documentId)=>axiosClient.get(`/products/${documentId}?populate=*`)
const getSimilarProductsByCat = (category)=> axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`)

const getAllCtagories = ()=> axiosClient.get('/products?fields[0]=category&pagination[pageSize]=100')

export default{
    getProductsList,
    getProductById,
    getSimilarProductsByCat,
    getAllCtagories
}
