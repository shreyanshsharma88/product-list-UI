import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h5" component="h1" sx={{ color: 'primary.main', fontWeight: 700 }}>
              Product Explorer
            </Typography>
          </motion.div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};