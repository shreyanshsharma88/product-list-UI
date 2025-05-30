import { Box, Pagination, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { ProductDetail, ProductFilters, ProductGrid } from "./Components";
import { ErrorMessage } from "./Components/Error";
import { useCategories, useProductFilters } from "./Hooks";
import type { Product } from "./types";
import { glassmorphism } from "./theme";

export default function Render() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
  // const {
  //   data: productsData,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useProducts(PRODUCTS_PER_PAGE, skip);
  // const { data: categories = [] } = useCategories();

  const {
    filters,
    updateFilter,
    resetFilters,
    filteredAndSortedProducts,
    isLoading,
    error,
    refetch,
    totalPages,
    productsData,
  } = useProductFilters(currentPage);

  const { data: categories } = useCategories();

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailOpen(false);
    setSelectedProduct(null);
  }, []);

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    []
  );

  // const totalPages = productsData
  //   ? Math.ceil(productsData.total / PRODUCTS_PER_PAGE)
  //   : 0;

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load products. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <Box
      sx={{
        borderRadius: "20px",
        padding: "2rem",

        maxWidth: 1280,
        mx: "auto",
        my: 4,

        ...glassmorphism,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" gutterBottom>
            Product Showcase
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover amazing products with advanced filtering and sorting
            options
          </Typography>
        </Box>

        <ProductFilters
          categories={(categories ?? []).map((cat) => cat.slug)}
          selectedCategory={filters.category}
          sortBy={filters.sortBy}
          sortDirection={filters.sortDirection}
          searchTerm={filters.searchTerm}
          onCategoryChange={(category) => {
            setCurrentPage(0); 
            updateFilter("category", category)}}
          onSortChange={(sortBy, direction) => {
            updateFilter("sortBy", sortBy);
            updateFilter("sortDirection", direction);
          }}
          onSearchChange={(term) => updateFilter("searchTerm", term)}
          onClearFilters={resetFilters}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Paper sx={{ p: 2, mb: 3, bgcolor: "grey.50" }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredAndSortedProducts.length} of{" "}
              {productsData?.total || 0} products
              {filters.category && ` in "${filters.category}"`}
              {filters.searchTerm && ` matching "${filters.searchTerm}"`}
            </Typography>
          </Paper>
        </motion.div>

        <ProductGrid
          products={filteredAndSortedProducts}
          loading={isLoading}
          onViewDetails={handleViewDetails}
        />

        {!isLoading && filteredAndSortedProducts.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper sx={{ p: 4, textAlign: "center", mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or search terms
              </Typography>
            </Paper>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          </motion.div>
        )}

        <ProductDetail
          product={selectedProduct}
          open={detailOpen}
          onClose={handleCloseDetail}
        />
      </motion.div>
    </Box>
  );
}
