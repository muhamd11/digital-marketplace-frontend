const { default: axiosClient } = require("./axiosClient");

const getProducts = () => axiosClient.get('products?populate=*')
const getProductById = (id) => axiosClient.get(`products/${id}?populate=*`)
const getProductByCategory = (category) => axiosClient.get(`products?filters[category][$eq]=${category}&populate=*`)

export default {
    getProducts,
    getProductById,
    getProductByCategory
}