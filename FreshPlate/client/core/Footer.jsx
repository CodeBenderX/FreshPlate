import React from 'react'
import { Typography, Container, Box } from '@mui/material'

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Tasty Recipes. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}