import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
} from '@mui/material'
import { AccessTime, Person, Close, Edit, Delete } from '@mui/icons-material'

export default function Recipe() {
  const [recipes, setRecipes] = useState([])

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

      {recipes.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 8, backgroundColor: '#FFF5F2' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              No recipes yet. Create your first recipe to get started!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {recipes.map((recipe, index) => (
            <Card key={index} sx={{ position: 'relative' }}>
              <IconButton
                sx={{ position: 'absolute', right: 8, top: 8 }}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {recipe.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Posted by: {recipe.author}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      Prep: {recipe.prepTime} mins
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      Cook: {recipe.cookTime} mins
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Person fontSize="small" />
                    <Typography variant="body2">
                      Serves: {recipe.servings}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={recipe.difficulty}
                  sx={{
                    backgroundColor: '#FFB74D',
                    color: 'white',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  Ingredients
                </Typography>
                <List>
                  {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={ingredient} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" gutterBottom>
                  Instructions
                </Typography>
                <List>
                  {recipe.instructions && recipe.instructions.map((step, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={`${idx + 1}. ${step}`} />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => {}}
                  >
                    Edit recipe
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {}}
                  >
                    Delete recipe
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  )
}