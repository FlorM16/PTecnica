import { createContext, useContext, useState } from "react";
import {createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest} from '../api/products'

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);

    if (!context) { throw new Error("useProducts must be used within a ProductProvider");}
    return context;
  };

  export function ProductProvider ( { children }) {

    const [products, setProducts] = useState([]);
    
    const getProducts = async () => {
        try {
            const res = await getProductsRequest()
            setProducts(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    const createProduct = async (product) => {   
    const res = await createProductRequest(product)
    console.log(res)
    }

    const deleteProduct = async (_id) => {
        try {
            const res = await deleteProductRequest(_id);
            if (res.status === 204) setProducts(products.filter((product) => product._id !== _id));
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async (_id) => {
        try {
            const res = await getProductRequest(_id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const updateProduct = async (_id, product) => {
        try {
            await updateProductRequest(_id, product)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <ProductContext.Provider 
        value = {{
            products,
            createProduct,
            getProducts,
            deleteProduct,
            getProduct,
            updateProduct
        }} >
            { children }
        </ProductContext.Provider>
    );
  }