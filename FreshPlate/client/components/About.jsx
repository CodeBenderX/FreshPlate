import React from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import communityMeal from "../src/assets/communityMeal.png";
import cookingTogether from "../src/assets/cookingTogether.png";
import familyCookingTogether from "../src/assets/familyCookingTogether.png";

export default function AboutPage() {
  return (
    <Container component="main" sx={{ marginTop: 4 }}>
      {/* About FreshPlate Heading */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        About FreshPlate
      </Typography>

      <Box sx={{ maxWidth: 800, margin: "auto", textAlign: "center", marginBottom: 4 }}>
        <Typography variant="body1" sx={{ color: "#4A4A4A" }}>
          Welcome to FreshPlate – your ultimate destination for all things cooking! Whether you're a seasoned chef or a beginner in the kitchen, we’re here to inspire your culinary creativity and help you make fresh, delicious meals from the comfort of your home.
        </Typography>
      </Box>

      {/* About FreshPlate Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: "#4A4A4A" }}>
            At FreshPlate, we believe that food should be fresh, fun, and easy to create. That's why we’ve built a space where you can explore a wide variety of recipes, share your own culinary creations, and discover new ideas to elevate your cooking game. Our mission is to bring people together through the joy of food, one recipe at a time.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia component="img" image={communityMeal} alt="Community Meal" sx={{ borderRadius: "8px" }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <CardMedia component="img" image={cookingTogether} alt="Cooking Together" sx={{ borderRadius: "8px" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: "#4A4A4A" }}>
            FreshPlate was born out of a love for home cooking and the desire to make it easier for people to share and discover great food. What started as a small idea to organize and share our favorite recipes quickly grew into a platform where cooks of all levels could contribute, learn, and grow together.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: "#4A4A4A" }}>
            We’re passionate about fostering a positive and supportive environment where everyone—from novice cooks to experienced chefs—can feel confident experimenting with new flavors, techniques, and ingredients. The kitchen is a place for everyone to explore and express themselves, and FreshPlate is here to guide you along the way.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia component="img" image={familyCookingTogether} alt="Family Cooking Together" sx={{ borderRadius: "8px" }} />
        </Grid>
      </Grid>

      {/* Meet the Team Section */}
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Meet the Team
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Pseudo Squad
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
          {[
            { name: "Angelo Tiquio", role: "Lead Frontend Developer" },
            { name: "Lorenzo Menil", role: "Lead Backend Developer" },
            { name: "Bianca Salunga", role: "QA/UI Designer" },
            { name: "Ovovwere Umavwodo", role: "Frontend Developer" },
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", padding: 2, boxShadow: "none", backgroundColor: "#f9f9f9" }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: "#e0e0e0",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 2,
                  }}
                >
                  {/* Placeholder for team member's image */}
                  <Typography variant="h6" color="text.secondary">
                    Image
                  </Typography>
                </Box>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
