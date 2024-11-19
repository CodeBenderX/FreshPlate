import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  styled
} from '@mui/material';
import { Upload } from 'lucide-react';
import auth from "../lib/auth-helper";

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#666',
  },
});

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

      setNotification({ open: true, message: 'Recipe updated successfully', severity: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error updating recipe:', error);
      setNotification({ open: true, message: 'Failed to update recipe', severity: 'error' });
    }
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
    <Box sx={{ maxWidth: '100%', bgcolor: '#fff9f5', minHeight: '100vh', py: 4 }}>
      <Typography 
        variant="h1" 
        sx={{ 
          textAlign: 'center', 
          color: '#ff4400', 
          fontSize: '2.5rem',
          mb: 4 
        }}
      >
        Recipes
      </Typography>

      <Box 
        sx={{ 
          maxWidth: 600,
          mx: 'auto',
          bgcolor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          p: 3
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'normal' }}>
          Edit Recipe
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography sx={{ mb: 1, color: '#666' }}>Recipe Title*</Typography>
              <StyledTextField
                fullWidth
                name="title"
                value={recipe.title}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 1, color: '#666' }}>Ingredients*</Typography>
              <StyledTextField
                fullWidth
                name="ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                multiline
                rows={4}
                required
                variant="outlined"
                size="small"
              />
            </Box>

            <Box>
              <Typography sx={{ mb: 1, color: '#666' }}>Instructions*</Typography>
              <StyledTextField
                fullWidth
                name="instructions"
                value={recipe.instructions}
                onChange={handleChange}
                multiline
                rows={6}
                required
                variant="outlined"
                size="small"
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mb: 1, color: '#666' }}>Prep Time</Typography>
                <StyledTextField
                  fullWidth
                  name="prepTime"
                  type="number"
                  value={recipe.prepTime}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mb: 1, color: '#666' }}>Cook Time</Typography>
                <StyledTextField
                  fullWidth
                  name="cookTime"
                  type="number"
                  value={recipe.cookTime}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography sx={{ mb: 1, color: '#666' }}>Servings</Typography>
                <StyledTextField
                  fullWidth
                  name="servings"
                  type="number"
                  value={recipe.servings}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>

            <Box>
              <Typography sx={{ mb: 1, color: '#666' }}>Upload</Typography>
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f5f5f5' }
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="recipe-image-upload"
                  type="file"
                />
                <label htmlFor="recipe-image-upload" style={{ cursor: 'pointer' }}>
                  <Upload size={24} style={{ marginBottom: 8 }} />
                  <Typography color="#666">Upload an image</Typography>
                </label>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                fullWidth
                type="submit"
                sx={{
                  bgcolor: '#333',
                  color: 'white',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#444'
                  }
                }}
              >
                Update Recipe
              </Button>
              <Button
                fullWidth
                onClick={() => navigate('/')}
                sx={{
                  border: '1px solid #ddd',
                  color: '#666',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#f5f5f5'
                  }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}