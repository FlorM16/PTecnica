import axios from "./axios";

export const getProductsRequest = async () => axios.get("/products");

export const getProductRequest = async (_id) => axios.get(`/products/${_id}`);

export const createProductRequest = async (product) => axios.post("/products", product);

export const updateProductRequest = async (_id, product) => axios.put(`/products/${_id}`, product);

export const deleteProductRequest = async (_id) => axios.delete(`/products/${_id}`);

