/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useState } from "react";
import type { SortDirection } from "../types";
import { useProducts } from "./useProducts";

const PRODUCTS_PER_PAGE = 30;

interface FilterOptions {
  category: string;
  sortBy: string;
  sortDirection: SortDirection;
  searchTerm: string;
}

export const useProductFilters = (currentPage: number) => {
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    sortBy: "",
    sortDirection: "asc",
    searchTerm: "",
  });
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useProducts(PRODUCTS_PER_PAGE, skip , filters.category);

  const products = productsData?.products || [];


  const updateFilter = useCallback(
    (key: keyof FilterOptions, value: string | SortDirection) => {
      
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      category: "",
      sortBy: "",
      sortDirection: "asc",
      searchTerm: "",
    });
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (filters.searchTerm) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
          case "price":
            aValue = a.price;
            bValue = b.price;
            break;
          case "title":
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case "rating":
            aValue = a.rating;
            bValue = b.rating;
            break;
          default:
            return 0;
        }

        if (filters.sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return result;
  }, [products, filters]);

  const totalProducts = productsData?.total || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredAndSortedProducts,
    isLoading,
    error,
    refetch,
    totalPages,
    totalProducts,

    productsData
  };
};
