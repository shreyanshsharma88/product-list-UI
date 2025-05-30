import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Typography,
  Button,
} from '@mui/material';
import { Clear, FilterList } from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { SortDirection } from '../types';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  sortBy: string;
  sortDirection: SortDirection;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string, direction: SortDirection) => void;
  onSearchChange: (term: string) => void;
  onClearFilters: () => void;
}

const sortOptions = [
  { value: 'price', label: 'Price' },
  { value: 'title', label: 'Title' },
  { value: 'rating', label: 'Rating' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  sortBy,
  sortDirection,
  searchTerm,
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedCategory || sortBy || searchTerm;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          p: 3,
          mb: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterList sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Filters</Typography>
          {hasActiveFilters && (
            <Button
              size="small"
              startIcon={<Clear />}
              onClick={onClearFilters}
              sx={{ ml: 'auto' }}
            >
              Clear All
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          <TextField
            label="Search Products"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="small"
            fullWidth
          />

          <FormControl size="small" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => onSortChange(e.target.value, sortDirection)}
            >
              <MenuItem value="">None</MenuItem>
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth disabled={!sortBy}>
            <InputLabel>Direction</InputLabel>
            <Select
              value={sortDirection}
              label="Direction"
              onChange={(e) => onSortChange(sortBy, e.target.value as SortDirection)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {searchTerm && (
              <Chip
                label={`Search: ${searchTerm}`}
                onDelete={() => onSearchChange('')}
                size="small"
              />
            )}
            {selectedCategory && (
              <Chip
                label={`Category: ${selectedCategory}`}
                onDelete={() => onCategoryChange('')}
                size="small"
              />
            )}
            {sortBy && (
              <Chip
                label={`Sort: ${sortBy} (${sortDirection})`}
                onDelete={() => onSortChange('', 'asc')}
                size="small"
              />
            )}
          </Box>
        )}
      </Box>
    </motion.div>
  );
};
