import React, { useState } from 'react'
import { Button, Card, CardContent, CardActions, Typography, TextField, AppBar, Toolbar, Container, Grid } from '@mui/material'
import Link from 'next/link'

const featuredRecipes = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    prepTime: 10,
    cookTime: 15,
    servings: 4
  },
  {
    id: '2',
    title: 'Chicken Curry',
    prepTime: 15,
    cookTime: 30,
    servings: 6
  },
  {
    id: '3',
    title: 'Vegetable Stir Fry',
    prepTime: 10,
    cookTime: 10,
    servings: 2
  }
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} href="/" sx={{ flexGrow: 1 }}>
            FreshPlate
          </Typography>
          <Button color="inherit" component={Link} href="/">Home</Button>
          <Button color="inherit" component={Link} href="/about">About</Button>
          <Button color="inherit" component={Link} href="/recipes">Recipes</Button>
          <Button color="inherit" component={Link} href="/contact">Contact</Button>
          <Button color="inherit" component={Link} href="/login">Login</Button>
        </Toolbar>
      </AppBar>

      <Container component="main">
        <section>
          <Typography variant="h2" component="h1" gutterBottom>
            Fresh Ideas, Fresh Flavors
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Discover, share, and indulge in a world of flavours that elevate your cooking experience.
          </Typography>
          <form onSubmit={handleSearch}>
            <TextField
              type="search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Recipes
          </Typography>
          <Grid container spacing={3}>
            {featuredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Prep: {recipe.prepTime} min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cook: {recipe.cookTime} min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Serves: {recipe.servings}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} href={`/recipes/${recipe.id}`}>
                      View Recipe
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            Join Our Cooking Community
          </Typography>
          <Typography variant="body1" gutterBottom>
            Share your recipes, get inspired, and connect with food lovers
          </Typography>
          <Button variant="contained" color="primary" component={Link} href="/signup">
            Sign Up Now
          </Button>
        </section>
      </Container>

      <Container component="footer" sx={{ mt: 4, py: 3 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} Tasty Recipes. All rights reserved.
        </Typography>
      </Container>
    </div>
  )
}