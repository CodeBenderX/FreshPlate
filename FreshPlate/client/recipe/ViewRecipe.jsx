//View recipe by id
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Dialog
} from '@mui/material';
import { X, Edit, Trash2, Clock, Users } from 'lucide-react';
import auth from "../lib/auth-helper";

export default function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  
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

  const handleDelete = async () => {
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

      navigate('/');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError("Failed to delete recipe. Please try again later.");
    }
    setDeleteDialog(false);
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

  if (!recipe) return null;

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
          maxWidth: 800,
          mx: 'auto',
          bgcolor: 'white',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          position: 'relative',
          p: 3
        }}
      >
        <IconButton 
          onClick={() => navigate('/')}
          sx={{ 
            position: 'absolute',
            right: 8,
            top: 8
          }}
        >
          <X size={20} />
        </IconButton>

        <Typography variant="h4" sx={{ mb: 2, pr: 4 }}>
          {recipe.title}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Posted by: {recipe.creator}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock size={16} />
              <Typography>Prep: {recipe.prepTime} mins</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock size={16} />
              <Typography>Cook: {recipe.cookTime} mins</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users size={16} />
              <Typography>Serves: {recipe.servings}</Typography>
            </Box>
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
          <Typography variant="h6" sx={{ mb: 2 }}>Ingredients</Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            {recipe.ingredients.split('\n').map((ingredient, index) => (
              <Typography component="li" key={index} sx={{ mb: 1 }}>
                {ingredient}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Instructions</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Steps:</Typography>
          <Box component="ol" sx={{ pl: 2 }}>
            {recipe.instructions.split('\n').map((instruction, index) => (
              <Typography component="li" key={index} sx={{ mb: 1 }}>
                {instruction}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            startIcon={<Edit size={16} />}
            onClick={() => navigate(`/editrecipe?id=${recipe._id}`)}
            sx={{ 
              color: '#666',
              borderColor: '#ddd',
              '&:hover': { borderColor: '#999' }
            }}
          >
            Edit recipe
          </Button>
          <Button
            startIcon={<Trash2 size={16} />}
            onClick={() => setDeleteDialog(true)}
            sx={{ 
              color: '#666',
              borderColor: '#ddd',
              '&:hover': { borderColor: '#999' }
            }}
          >
            Delete recipe
          </Button>
        </Box>
      </Box>

      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Delete Recipe</Typography>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to delete this recipe? This action cannot be undone.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleDelete}
              sx={{ 
                bgcolor: '#dc3545',
                color: 'white',
                '&:hover': { bgcolor: '#c82333' }
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
