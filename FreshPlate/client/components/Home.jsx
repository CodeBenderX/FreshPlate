import React, { useState } from 'react';
import { Button, Typography, TextField, Container, Grid2 } from '@mui/material';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'

const featuredRecipes = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
  },
  {
    id: "2",
    title: "Chicken Curry",
    prepTime: 15,
    cookTime: 30,
    servings: 6,
  },
  {
    id: "3",
    title: "Vegetable Stir Fry",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div>
          <Container component="main">
        <section>
          <Typography variant="h2" component="h1" gutterBottom>
            Discover Delicious Recipes
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Find and share the best recipes from around the world
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
          <Grid2 container spacing={3}>
            {featuredRecipes.map((recipe) => (
              <Grid2 item xs={12} sm={6} md={4} key={recipe.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={recipe.image}
                      alt={recipe.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {recipe.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                        Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min | Serves: {recipe.servings}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" component="a" href={`/recipes/${recipe.id}`}>
                      View Recipe
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </section>
      </Container>
    </div>
  );
}


// Home.jsx
// import React, { useState } from 'react';
// import { Button, Card, CardContent, Typography, TextField, Container, Grid2 } from '@mui/material';

// export default function HomePage() {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Searching for:', searchQuery);
//   };

//   return (
//     <Container>
//       <Typography variant="h2" gutterBottom>Welcome to the Recipe App</Typography>
//       <form onSubmit={handleSearch}>
//         <TextField
//           label="Search for a recipe"
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary">Search</Button>
//       </form>

//       {/* Example of a grid displaying some cards */}
//       <Grid2 container spacing={3} style={{ marginTop: '20px' }}>
//         <Grid2 item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h5">Recipe 1</Typography>
//               <Typography variant="body2">Description of Recipe 1</Typography>
//             </CardContent>
//           </Card>
//         </Grid2>
//         <Grid2 item xs={12} sm={6} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h5">Recipe 2</Typography>
//               <Typography variant="body2">Description of Recipe 2</Typography>
//             </CardContent>
//           </Card>
//         </Grid2>
//         {/* Add more Grid items as needed */}
//       </Grid2>
//     </Container>
//   );
// }
