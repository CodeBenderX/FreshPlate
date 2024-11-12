import React from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  IconButton,
  Pagination,
  PaginationItem,
} from '@mui/material'
import { Add, Edit, Delete, ChevronRight } from '@mui/icons-material'

export default function RecipeList() {
  const recipes = [
    { id: 1, title: 'Chicken with Creamy Mushroom Sauce' },
    { id: 2, title: 'Spaghetti Carbonara' },
    { id: 3, title: 'How to make Beef Bulgogi' },
    { id: 4, title: 'How to make Beef Bulgogi' },
    { id: 5, title: 'How to make Beef Bulgogi' },
  ]

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textAlign: 'center',
          color: '#FF5722',
          mb: 4,
          fontWeight: 'bold',
        }}
      >
        Recipes
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{
          mb: 3,
          backgroundColor: '#333',
          '&:hover': {
            backgroundColor: '#444',
          },
        }}
      >
        Add New Recipe
      </Button>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              boxShadow: 'none',
            }}
          >
            <Typography variant="h6" component="h2">
              {recipe.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Button
                variant="outlined"
                endIcon={<ChevronRight />}
                sx={{ borderRadius: '4px' }}
              >
                View Recipe
              </Button>
              <IconButton
                size="small"
                sx={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={10}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#333',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#444',
                  },
                },
              }}
            />
          )}
        />
      </Box>
    </Container>
  )
}