import axios from "axios";
const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = "http://localhost:1337/api";
// const apiUrl = "https://e-commerce-strapi-next.onrender.com/api/";
export const hostName = 'http://localhost:1337' 
const axiosClient = axios.create({
    baseURL:apiUrl,
    headers:{
        Authorization:`Bearer ${apiKey}`
        
    }
});

export default axiosClient ;