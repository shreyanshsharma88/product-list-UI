import { useQuery } from '@tanstack/react-query';
import { productApi } from '../http';

export const useProducts = (limit = 30, skip = 0) => {
  return useQuery({
    queryKey: ['products', limit, skip],
    queryFn: () => productApi.getProducts(limit, skip),
    staleTime: 5 * 60 * 1000,
  
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
    staleTime: 10 * 60 * 1000,
   
  });
};

export const useProductsByCategory = (category: string, limit = 30, skip = 0) => {
  return useQuery({
    queryKey: ['products', 'category', category, limit, skip],
    queryFn: () => productApi.getProductsByCategory(category, limit, skip),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
    
  });
};