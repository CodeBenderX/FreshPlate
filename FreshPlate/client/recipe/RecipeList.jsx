import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  IconButton,
  Pagination,
  PaginationItem,
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Edit, Delete, ChevronRight } from "@mui/icons-material";
import auth from "../lib/auth-helper";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    recipeId: null,
  });
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleEditRecipe = (recipeId) => {
    navigate(`/editrecipe?id=${recipeId}`)
  }

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true)
      const jwt = auth.isAuthenticated()
      if (!jwt) {
        throw new Error('User not authenticated')
      }
      const response = await fetch('/api/recipes', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt.token
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }

      const data = await response.json()
      //const userRecipes = data.filter(recipe => recipe.creator === jwt.user.name) //this is to filter the recipes that will show what the signed user created
      
      setRecipes(data)
      setTotalPages(Math.ceil(data.length / itemsPerPage))
      setError(null)
    } catch (err) {
      setError('Failed to load recipes. Please try again later.')
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }, [itemsPerPage])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const handleDeleteRecipe = useCallback(async () => {
    const recipeId = deleteDialog?.recipeId;

    const jwt = auth.isAuthenticated()
    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwt.token
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete recipe')
      }

      setSnackbar({ open: true, message: 'Recipe deleted successfully', severity: 'success' })
      await fetchRecipes() // Refresh the recipe list
    } catch (error) {
      console.error("Error deleting recipe:", error)
      setSnackbar({ open: true, message: "Could not delete recipe. Please try again later.", severity: 'error' })
    } finally {
      setDeleteDialog({ open: false, recipeId: null })
    }
  }, [deleteDialog, auth, fetchRecipes, setSnackbar, setDeleteDialog])

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleOpenDeleteDialog = (recipe) => {
    setDeleteDialog({ open: true, recipeId: recipe._id });
  }

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({ open: false, recipeId: null })
  }

  const indexOfLastRecipe = currentPage * itemsPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading recipes...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textAlign: 'center',
          color: '#FF5722',
          mb: 4,
          fontWeight: 'bold',
        }}
      >
        Recipes
      </Typography>

      <Link to="/addrecipe" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            mb: 3,
            backgroundColor: '#333',
            '&:hover': {
              backgroundColor: '#444',
            },
          }}
        >
          Add New Recipe
        </Button> 
      </Link>  

      {recipes.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          You haven't created any recipes yet. Click 'Add New Recipe' to get started!
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {currentRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #e0e0e0",
                boxShadow: "none",
              }}
            >
              <Typography variant="h6" component="h2">
                {recipe.title}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Button
                  variant="outlined"
                  endIcon={<ChevronRight />}
                  sx={{ borderRadius: "4px" }}
                >
                  View Recipe
                </Button>
                {" "}
                <IconButton
                  size="small"
                  sx={{ border: "1px solid #e0e0e0", borderRadius: "4px" }}
                  onClick={() => handleEditRecipe(recipe._id)}
                >
                  <Edit fontSize="small" />
                </IconButton>
                
                <IconButton
                  size="small"
                  sx={{ border: "1px solid #e0e0e0", borderRadius: "4px" }}
                  onClick={() => handleOpenDeleteDialog(recipe)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      )}
      {recipes.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: '#333',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#444',
                    },
                  },
                }}
              />
            )}
          />
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this recipe? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteRecipe} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}