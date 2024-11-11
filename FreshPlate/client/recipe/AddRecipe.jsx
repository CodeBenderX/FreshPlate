//creation of recipes
import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid2,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const AddRecipePage = () => {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ paddingTop: 4, paddingBottom: 4 }}
    >
      {/* Page Title */}
      <Typography
        variant="h3"
        align="center"
        color="#FF6E1C"
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        Recipes
      </Typography>

      {/* Card for Form */}
      <Card sx={{ padding: 4, backgroundColor: "#fff" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ fontWeight: "bold", marginBottom: 3 }}
          >
            Add new Recipe
          </Typography>

          {/* Recipe Title */}
          <TextField
            label="Recipe Title*"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          {/* Ingredients */}
          <TextField
            label="Ingredients*"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ marginBottom: 2 }}
          />

          {/* Instructions */}
          <TextField
            label="Instructions*"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />

          {/* Prep Time, Cook Time, Servings */}
          <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid2 item xs={4}>
              <TextField
                label="Prep Time"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Minutes</InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />
            </Grid2>
            <Grid2 item xs={4}>
              <TextField
                label="Cook Time"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Minutes</InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
              />
            </Grid2>
            <Grid2 item xs={4}>
              <TextField
                label="Servings"
                type="number"
                variant="outlined"
                fullWidth
              />
            </Grid2>
          </Grid2>

          {/* Image Upload */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 3,
            }}
          >
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
              fullWidth
            >
              Upload an image
              <input type="file" hidden />
            </Button>
          </Box>

          {/* Action Buttons */}
          <Grid2 container spacing={2}>
            <Grid2 item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Add Recipe
              </Button>
            </Grid2>
            <Grid2 item xs={6}>
              <Button variant="outlined" color="secondary" fullWidth>
                Cancel
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddRecipePage;
