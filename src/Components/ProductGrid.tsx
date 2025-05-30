import React from "react";
import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types";
import { LoadingCard } from "./Loader";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onViewDetails: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  onViewDetails,
}) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 12,
              lg: 3,
            }}
            key={index}
          >
            <LoadingCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product, index) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
          key={product.id}
        >
          <ProductCard
            product={product}
            onViewDetails={onViewDetails}
            index={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};
