import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

export const LoadingCard: React.FC = () => {
    return (
      <Card sx={{ height: 400 }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={32} />
          <Skeleton variant="text" height={20} width="60%" />
          <Box sx={{ mt: 2 }}>
            <Skeleton variant="text" height={24} width="40%" />
          </Box>
        </CardContent>
      </Card>
    );
  };