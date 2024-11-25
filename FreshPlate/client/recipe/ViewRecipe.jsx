import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import auth from "../lib/auth-helper";
import defaultRecipeImage from "../src/assets/defaultFoodImage.png";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const RenderTextWithLineBreaks = ({ text }) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

export default function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const recipeId = new URLSearchParams(location.search).get('id');

  const getImageUrl = useCallback((recipe) => {
    if (recipe.image && recipe.image.data && recipe.image.contentType) {
      let imageData;
      if (typeof recipe.image.data === 'string') {
        imageData = recipe.image.data;
      } else if (typeof recipe.image.data === 'object' && recipe.image.data.type === 'Buffer') {
        // Convert Buffer data to base64 string
        imageData = btoa(String.fromCharCode.apply(null, recipe.image.data.data));
      } else {
        console.error('Unexpected image data format:', recipe.image.data);
        return null;
      }
      return `data:${recipe.image.contentType};base64,${imageData}`;
    }
    return defaultRecipeImage;
  }, []);

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

  const handleClose = () => {
    navigate('/recipelist');
  };

  const handleEdit = () => {
    navigate(`/editrecipe?id=${recipeId}`);
  };

  const handleDelete = () => {
    setDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const jwt = auth.isAuthenticated();
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt.token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      navigate('/recipelist');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError("Failed to delete recipe. Please try again later.");
    }
    setDeleteDialog(false);
  };

  // const getImageUrl = (recipe) => {
  //   if (recipe.image && recipe.image.data && recipe.image.contentType) {
  //     return `data:${recipe.image.contentType};base64,${recipe.image.data}`;
  //   }
  //   return null;
  // };

//   const getImageUrl = useCallback((recipe) => {
//     if (recipe.image && recipe.image.data && recipe.image.contentType) {
//       const imageData = typeof recipe.image.data === 'string' 
//       ? recipe.image.data 
//       : Buffer.from(recipe.image.data).toString('base64');
//     return `data:${recipe.image.contentType};base64,${imageData}`;
//   }
//   return null;
// }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!recipe) return null;

  const imageUrl = getImageUrl(recipe);

  return (
    <Box sx={{ maxWidth: '100%', bgcolor: '#fff1e7', minHeight: '100vh', py: 4 }}>
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
          maxWidth: 800,
          mx: 'auto',
          bgcolor: 'white',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          position: 'relative',
          p: 3
        }}
      >
        
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            mb: 3,
            aspectRatio: '16 / 9',
            maxHeight: '400px',
            overflow: 'hidden',
          }}
        >
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={recipe.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#f0f0f0',
              }}
              onError={(e) => {
                console.error('Error loading image:', e);
                e.target.onerror = null;
                e.target.src = '/placeholder.svg?height=400&width=800';
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f0f0f0',
                color: '#999',
              }}
            >
              No Image Available
            </Box>
          )}
        </Box>

        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" sx={{ mb: 2, pr: 4 }}>
          {recipe.title}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Posted by: {recipe.creator}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Typography color="text.secondary">
              Prep: {recipe.preptime || '-'} mins
            </Typography>
            <Typography color="text.secondary" >
              Cook: {recipe.cooktime || '-'} mins
            </Typography>
            <Typography color="text.secondary" >
              Serves: {recipe.servings || '-'}
            </Typography>
          </Box>

          <Chip
            label="Medium"
            sx={{
              bgcolor: '#ffd700',
              color: '#000',
              fontWeight: 500
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2}}>Ingredients</Typography>
          {recipe.ingredients ? (
            <Box sx={{ pl: 2 }}>
              <RenderTextWithLineBreaks text={recipe.ingredients} />
            </Box>
          ) : (
            <Typography>No ingredients available</Typography>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2}}>Instructions</Typography>
          {recipe.instructions ? (
            <Box sx={{ pl: 2 }}>
              <RenderTextWithLineBreaks text={recipe.instructions} />
            </Box>
          ) : (
            <Typography>No instructions available</Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{
              bgcolor: '#333',
              color: 'white',
              '&:hover': {
                bgcolor: '#444'
              }
            }}
          >
            Edit Recipe
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{
              color: '#666',
              borderColor: '#ddd',
              '&:hover': {
                bgcolor: '#f5f5f5'
              }
            }}
          >
            Delete Recipe
          </Button>
        </Box>
      </Box>

      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}