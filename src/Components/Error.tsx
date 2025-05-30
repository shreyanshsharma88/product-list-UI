import { ErrorOutline, Refresh } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'Something went wrong', 
  onRetry 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: 'error.50',
          border: '1px solid',
          borderColor: 'error.200',
        }}
      >
        <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {message}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        )}
      </Paper>
    </motion.div>
  );
};