import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
} from '@mui/material';
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, index }) => {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          },
        }}
        onClick={() => onViewDetails(product)}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.thumbnail}
            alt={product.title}
            sx={{ objectFit: 'cover' }}
          />
          {product.discountPercentage > 0 && (
            <Chip
              label={`-${Math.round(product.discountPercentage)}%`}
              color="error"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                fontWeight: 'bold',
              }}
            />
          )}
          <Chip
            label={product.availabilityStatus}
            color={product.stock > 0 ? 'success' : 'error'}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" gutterBottom noWrap>
            {product.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ${discountedPrice.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <Chip
              label={product.category}
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Visibility />}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(product);
                }}
                sx={{ flex: 1 }}
              >
                View
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<ShoppingCart />}
                onClick={(e) => {e.stopPropagation()
                  toast.success('Not integrated yet!')
                }}
                sx={{ flex: 1 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};