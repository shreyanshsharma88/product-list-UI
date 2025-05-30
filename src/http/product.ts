import type { Product, ProductsResponse } from "../types";
import { api } from "./api";

export const productApi = {
  getProducts: async (limit = 30, skip = 0): Promise<ProductsResponse> => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<
    { slug: string; name: string; url: string }[]
  > => {
    const response = await api.get("/products/categories");
    return response.data;
  },

  getProductsByCategory: async (
    category: string,
    limit = 30,
    skip = 0
  ): Promise<ProductsResponse> => {
    const response = await api.get(
      `/products/category/${category}?limit=${limit}&skip=${skip}`
    );
    return response.data;
  },
};
