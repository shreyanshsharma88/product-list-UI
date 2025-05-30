
import {
  Close,
  Inventory,
  LocalShipping,
  Security,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import type { Product } from "../types";

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  open,
  onClose,
}) => {
  if (!product) return null;

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            component: motion.div,
            initial: { rotateY: 90, opacity: 0 },
            animate: { rotateY: 0, opacity: 1 },
            exit: { rotateY: 90, opacity: 0 },
            transition: { duration: 0.2 },
            style: {
              transformStyle: "preserve-3d",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="h2">
              Product Details
            </Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 6,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    component="img"
                    src={product.images[0] || product.thumbnail}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  {product.images.length > 1 && (
                    <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
                      {product.images.slice(1, 4).map((image, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={image}
                          alt={`${product.title} ${index + 2}`}
                          sx={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 1,
                            cursor: "pointer",
                            border: "2px solid transparent",
                            "&:hover": {
                              border: "2px solid",
                              borderColor: "primary.main",
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </motion.div>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  sm: 6,
                  md: 6,
                  lg: 6,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Typography variant="h4" gutterBottom>
                    {product.title}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating value={product.rating} precision={0.1} readOnly />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({product.rating} rating)
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant="h3"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      ${discountedPrice.toFixed(2)}
                    </Typography>
                    {product.discountPercentage > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          sx={{
                            ml: 2,
                            textDecoration: "line-through",
                            color: "text.secondary",
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Chip
                          label={`${Math.round(
                            product.discountPercentage
                          )}% OFF`}
                          color="error"
                          sx={{ ml: 1 }}
                        />
                      </>
                    )}
                  </Box>

                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>

                  <Box
                    sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}
                  >
                    <Chip label={product.category} color="primary" />
                    <Chip label={product.brand} variant="outlined" />
                    {product.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Paper sx={{ p: 2, mb: 3, bgcolor: "transparent" }}>
                    <Grid container spacing={2}>
                      <Grid
                        size={{
                          xs: 6,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Inventory sx={{ mr: 1, color: "success.main" }} />
                          <Typography variant="body2">
                            Stock: {product.stock} units
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocalShipping sx={{ mr: 1, color: "info.main" }} />
                          <Typography variant="body2">
                            {product.shippingInformation}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Security sx={{ mr: 1, color: "warning.main" }} />
                          <Typography variant="body2">
                            {product.warrantyInformation}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Min. Order: {product.minimumOrderQuantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Add to Cart - ${discountedPrice.toFixed(2)}
                  </Button>
                </motion.div>
              </Grid>

              {product.reviews.length > 0 && (
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Customer Reviews
                  </Typography>
                  <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                    {product.reviews.slice(0, 3).map((review, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Paper sx={{ p: 2, mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                              {review.reviewerName.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {review.reviewerName}
                              </Typography>
                              <Rating
                                value={review.rating}
                                size="small"
                                readOnly
                              />
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.primary">
                            {review.comment}
                          </Typography>
                        </Paper>
                      </motion.div>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
