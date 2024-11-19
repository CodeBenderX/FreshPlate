import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  TextField, 
  Typography, 
  Grid2, 
  InputAdornment,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import auth from "../lib/auth-helper";

export default function EditRecipe() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  
  const navigate = useNavigate();
  const location = useLocation();
  const recipeId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        setError("No recipe ID provided");
        setLoading(false);
        return;
      }

      try {
        const jwt = auth.isAuthenticated();
        if (!jwt) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/recipes/${recipeId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt.token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt = auth.isAuthenticated();
      if (!jwt) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt.token
        },
        body: JSON.stringify(recipe)
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      const updatedRecipe = await response.json();
      setRecipe(updatedRecipe);
      setNotification({ open: true, message: 'Recipe updated successfully', severity: 'success' });
      setTimeout(() => navigate('/'), 2000); // Navigate back to recipe list after 2 seconds
    } catch (error) {
      console.error('Error updating recipe:', error);
      setNotification({ open: true, message: 'Failed to update recipe', severity: 'error' });
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Card>
        <CardHeader title="Edit Recipe" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={3}>
              <Grid2 item xs={12}>
                <TextField
                  fullWidth
                  label="Recipe Title"
                  name="title"
                  value={recipe.title}
                  onChange={handleChange}
                  required
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  fullWidth
                  label="Ingredients"
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField
                  fullWidth
                  label="Instructions"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                  multiline
                  rows={6}
                  required
                />
              </Grid2>
              <Grid2 item xs={4}>
                <TextField
                  fullWidth
                  label="Prep Time"
                  name="prepTime"
                  type="number"
                  value={recipe.prepTime}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                  }}
                />
              </Grid2>
              <Grid2 item xs={4}>
                <TextField
                  fullWidth
                  label="Cook Time"
                  name="cookTime"
                  type="number"
                  value={recipe.cookTime}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                  }}
                />
              </Grid2>
              <Grid2 item xs={4}>
                <TextField
                  fullWidth
                  label="Servings"
                  name="servings"
                  type="number"
                  value={recipe.servings}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 item xs={12}>
                <Box
                  sx={{
                    border: '2px dashed grey',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
                    <Typography>Upload an image</Typography>
                  </label>
                </Box>
              </Grid2>
              <Grid2 item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Update Recipe
                </Button>
              </Grid2>
              <Grid2 item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </CardContent>
      </Card>
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}