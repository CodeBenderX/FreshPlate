import React, { useState } from "react";
import { Button, Typography, TextField, Container, Grid2 } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import image1 from "../src/assets/FriedPorkBelly.png";
import image2 from "../src/assets/GrilledSquid.png";
import image3 from "../src/assets/BakedSalmonwithVeg.png";
import burger from "../src/assets/BurgerHero1.png";

const featuredRecipes = [
  {
    id: "1",
    title: "Fried Pork Belly",
    prepTime: 30,
    cookTime: 35,
    servings: 4,
    image: image1,
  },
  {
    id: "2",
    title: "Grilled Squid",
    prepTime: 20,
    cookTime: 30,
    servings: 2,
    image: image2,
  },
  {
    id: "3",
    title: "Baked Salmon with Vegies",
    prepTime: 20,
    cookTime: 30,
    servings: 5,
    image: image3,
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
          <Card
            sx={{
              display: "flex",
              maxWidth: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent
              sx={{
                flex: "1 0 50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "32px",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1A1A1A",
                }}
              >
                Join us today and discover delicious Recipes.
              </Typography>
              <Typography variant="body1" sx={{ color: "#4A4A4A" }}>
                Share your recipes, get inspired, and connect with food lovers.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#1A1A1A",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                }}
              >
                Sign up now!
              </Button>
            </CardContent>
            <CardMedia
              component="img"
              sx={{
                width: "50%",
                objectFit: "cover",
                objectPosition: "center",
                borderTopLeftRadius: "100% 100%",
                borderBottomLeftRadius: "100% 100%",
                transform: "scaleX(1.2)",
              }}
              image={burger}
              alt="Delicious burger with fresh vegetables"
            />
          </Card>
        </section>

        <section>
          <Typography variant="h4" component="h2" gutterBottom>
            Sign up to view the recipes!
          </Typography>
          <Card>
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
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {recipe.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", mt: 1 }}
                        >
                          Prep: {recipe.prepTime} min | Cook: {recipe.cookTime}{" "}
                          min | Serves: {recipe.servings}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Card>
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
