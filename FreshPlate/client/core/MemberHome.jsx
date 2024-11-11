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
// import burger from "../src/assets/BurgerHero1.png";

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

export default function MemberHome() {
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
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        component="a"
                        href={`/recipes/${recipe.id}`}
                      >
                        View Recipe
                      </Button>
                    </CardActions>
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
