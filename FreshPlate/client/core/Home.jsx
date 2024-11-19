import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { Button, Typography, TextField, Container, Grid2 } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import image1 from "../src/assets/FriedPorkBelly.png";
import image2 from "../src/assets/GrilledSquid.png";
import image3 from "../src/assets/BakedSalmonwithVeg.png";
import image4 from "../src/assets/BakedHam.png";
import image5 from "../src/assets/ShrimpPasta.png";
import image6 from "../src/assets/StrawberryCake.png";
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
  {
    id: "4",
    title: "Baked Ham",
    prepTime: 10,
    cookTime: 45,
    servings: 8,
    image: image4,
  },
  {
    id: "5",
    title: "Shrimp Pasta",
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    image: image5,
  },
  {
    id: "6",
    title: "Strawberry Cake",
    prepTime: 40,
    cookTime: 60,
    servings: 10,
    image: image6,
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
              <Link to="/signup">
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
              </Link>
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