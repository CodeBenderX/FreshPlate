// import React, { useState } from "react";
// import { Button, Typography, TextField, Container, Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";
// import image1 from "../src/assets/FriedPorkBelly.png";
// import image2 from "../src/assets/GrilledSquid.png";
// import image3 from "../src/assets/BakedSalmonwithVeg.png";
// import burger from "../src/assets/BurgerHero1.png";

// const featuredRecipes = [
//   {
//     id: "1",
//     title: "Fried Pork Belly",
//     preptime: 30,
//     cooktime: 35,
//     servings: 4,
//     image: image1,
//   },
//   {
//     id: "2",
//     title: "Grilled Squid",
//     preptime: 20,
//     cooktime: 30,
//     servings: 2,
//     image: image2,
//   },
//   {
//     id: "3",
//     title: "Baked Salmon with Vegies",
//     preptime: 20,
//     cooktime: 30,
//     servings: 5,
//     image: image3,
//   },
// ];

// export default function MemberHome() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <div>
//       <Container component="main">
//         <section>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Discover Delicious Recipes
//           </Typography>
//           <Typography variant="h5" component="p" gutterBottom>
//             Find and share the best recipes from around the world
//           </Typography>
//           <form onSubmit={handleSearch}>
//             <TextField
//               type="search"
//               placeholder="Search recipes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Search
//             </Button>
//           </form>
//         </section>

//         <section>
//           <Typography variant="h4" component="h2" gutterBottom>
//             Featured Recipes
//           </Typography>
//           <Card>
//             <Grid container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid item xs={12} sm={6} md={4} key={recipe.id}>
//                   <Card sx={{ maxWidth: 345 }}>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={recipe.image}
//                         alt={recipe.title}
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                           {recipe.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary" }}
//                         >
//                           {recipe.description}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary", mt: 1 }}
//                         >
//                           Prep: {recipe.preptime} min | Cook: {recipe.cooktime}{" "}
//                           min | Serves: {recipe.servings}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button
//                         size="small"
//                         color="primary"
//                         component="a"
//                         href={`/recipes/${recipe.id}`}
//                       >
//                         View Recipe
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { Button, Typography, TextField, Container, Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";
// import burger from "../src/assets/BurgerHero1.png";

// export default function MemberHome() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [featuredRecipes, setFeaturedRecipes] = useState([]);

//   useEffect(() => {
//     fetchLatestRecipes();
//   }, []);

//   const fetchLatestRecipes = async () => {
//     try {
//       // Replace this URL with your actual API endpoint
//       const response = await fetch('api/recipes');
//       if (!response.ok) {
//         throw new Error('Failed to fetch latest recipes');
//       }
//       const data = await response.json();
//       setFeaturedRecipes(data);
//     } catch (error) {
//       console.error('Error fetching latest recipes:', error);
//       // You might want to set some error state here
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   return (
//     <div>
//       <Container component="main">
//         <section>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Discover Delicious Recipes
//           </Typography>
//           <Typography variant="h5" component="p" gutterBottom>
//             Find and share the best recipes from around the world
//           </Typography>
//           <form onSubmit={handleSearch}>
//             <TextField
//               type="search"
//               placeholder="Search recipes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Search
//             </Button>
//           </form>
//         </section>

//         <section>
//           <Typography variant="h4" component="h2" gutterBottom>
//             Featured Recipes
//           </Typography>
//           <Card>
//             <Grid container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid item xs={12} sm={6} md={4} key={recipe.id}>
//                   <Card sx={{ maxWidth: 345 }}>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={recipe.image}
//                         alt={recipe.title}
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                           {recipe.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary" }}
//                         >
//                           {recipe.description}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary", mt: 1 }}
//                         >
//                           Prep: {recipe.preptime} min | Cook: {recipe.cooktime}{" "}
//                           min | Serves: {recipe.servings}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button
//                         size="small"
//                         color="primary"
//                         component="a"
//                         href={`/recipes/${recipe.id}`}
//                       >
//                         View Recipe
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Button, Typography, TextField, Container, Grid, CircularProgress } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";
// import auth from "../lib/auth-helper";
// import image1 from "../src/assets/FriedPorkBelly.png";
// import image2 from "../src/assets/GrilledSquid.png";
// import image3 from "../src/assets/BakedSalmonwithVeg.png";
// import burger from "../src/assets/BurgerHero1.png";

// const defaultImages = [image1, image2, image3, burger];

// const list = async (credentials, signal) => {
//   try {
//     let response = await fetch('/api/recipes/', {
//       method: 'GET',
//       signal: signal,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + credentials.t
//       }
//     })
//     return await response.json()
//   } catch (err) {
//     console.log(err)
//   }
// }

// export default function MemberHome() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [featuredRecipes, setFeaturedRecipes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;
//     const jwt = auth.isAuthenticated();

//     if (jwt) {
//       fetchLatestRecipes(jwt, signal);
//     }

//     return function cleanup() {
//       abortController.abort();
//     }
//   }, []);

//   const fetchLatestRecipes = async (jwt, signal) => {
//     try {
//       setIsLoading(true);
//       const data = await list({ t: jwt.token }, signal);
//       if (data && data.error) {
//         setError(data.error);
//       } else {
//         const limitedRecipes = data.slice(0, 8).map((recipe, index) => ({
//           ...recipe,
//           image: recipe.image || defaultImages[index % defaultImages.length]
//         }));
//         setFeaturedRecipes(limitedRecipes);
//       }
//     } catch (error) {
//       setError("Could not load recipes");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   if (isLoading) {
//     return (
//       <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container component="main">
//         <Typography variant="h6" color="error" align="center">
//           {error}
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <div>
//       <Container component="main">
//         <section>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Discover Delicious Recipes
//           </Typography>
//           <Typography variant="h5" component="p" gutterBottom>
//             Find and share the best recipes from around the world
//           </Typography>
//           <form onSubmit={handleSearch}>
//             <TextField
//               type="search"
//               placeholder="Search recipes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Search
//             </Button>
//           </form>
//         </section>

//         <section>
//           <Typography variant="h4" component="h2" gutterBottom>
//             Featured Recipes
//           </Typography>
//           <Card>
//             <Grid container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid item xs={12} sm={6} md={4} key={recipe._id}>
//                   <Card sx={{ maxWidth: 345 }}>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={recipe.image}
//                         alt={recipe.title}
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                           {recipe.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary" }}
//                         >
//                           {recipe.description}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary", mt: 1 }}
//                         >
//                           Prep: {recipe.preptime} min | Cook: {recipe.cooktime}{" "}
//                           min | Serves: {recipe.servings}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button
//                         size="small"
//                         color="primary"
//                         component="a"
//                         href={`/recipes/${recipe._id}`}
//                       >
//                         View Recipe
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom'
// import { Button, Typography, TextField, Container, Grid, CircularProgress } from "@mui/material";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";
// import auth from "../lib/auth-helper";
// import defaultRecipeImage from "../src/assets/defaultFoodImage.png";


// const list = async (credentials, signal) => {
//   try {
//     let response = await fetch('/api/recipes/', {
//       method: 'GET',
//       signal: signal,
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + credentials.t
//       }
//     })
//     return await response.json()
//   } catch (err) {
//     console.log(err)
//   }
// }

// export default function MemberHome() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [featuredRecipes, setFeaturedRecipes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const abortController = new AbortController();
//     const signal = abortController.signal;
//     const jwt = auth.isAuthenticated();

//     if (jwt) {
//       fetchLatestRecipes(jwt, signal);
//     }

//     return function cleanup() {
//       abortController.abort();
//     }
//   }, []);

//   const fetchLatestRecipes = async (jwt, signal) => {
//     try {
//       setIsLoading(true);
//       const data = await list({ t: jwt.token }, signal);
//       if (data && data.error) {
//         setError(data.error);
//       } else {
//         const limitedRecipes = data.slice(0, 8).map(recipe => ({
//           ...recipe,
//           image: recipe.image || defaultRecipeImage
//         }));
//         setFeaturedRecipes(limitedRecipes);
//       }
//     } catch (error) {
//       setError("Could not load recipes");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log("Searching for:", searchQuery);
//   };

//   if (isLoading) {
//     return (
//       <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container component="main">
//         <Typography variant="h6" color="error" align="center">
//           {error}
//         </Typography>
//       </Container>
//     );
//   }



//   const handleViewRecipe = (recipeId) => {
//     navigate(`/viewrecipe?id=${recipeId}`)
//   }

//   return (
//     <div>
//       <Container component="main">
//         <section>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Discover Delicious Recipes
//           </Typography>
//           <Typography variant="h5" component="p" gutterBottom>
//             Find and share the best recipes from around the world
//           </Typography>
//           <form onSubmit={handleSearch}>
//             <TextField
//               type="search"
//               placeholder="Search recipes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Search
//             </Button>
//           </form>
//         </section>

//         <section>
//           <Typography variant="h4" component="h2" gutterBottom>
//             Recently Added Recipes
//           </Typography>
//           <Card>
//             <Grid container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid item xs={12} sm={6} md={4} key={recipe._id}>
//                   <Card sx={{ maxWidth: 345 }}>
//                     <CardActionArea>
//                       <CardMedia
//                         component="img"
//                         height="140"
//                         image={recipe.image}
//                         alt={recipe.title}
//                       />
//                       <CardContent>
//                         <Typography gutterBottom variant="h5" component="div">
//                           {recipe.title}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary" }}
//                         >
//                           {recipe.description}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{ color: "text.secondary", mt: 1 }}
//                         >
//                           Prep: {recipe.preptime} min | Cook: {recipe.cooktime}{" "}
//                           min | Serves: {recipe.servings}
//                         </Typography>
//                       </CardContent>
//                     </CardActionArea>
//                     <CardActions>
//                       <Button
//                         size="small"
//                         color="primary"
//                         component="a"
//                         onClick={() => handleViewRecipe(recipe._id)}
//                       >
//                         View Recipe
//                       </Button>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Container, CircularProgress, IconButton, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import auth from "../lib/auth-helper";
import defaultRecipeImage from "../src/assets/defaultFoodImage.png";
import image1 from "../src/assets/FriedPorkBelly.png";
import image2 from "../src/assets/GrilledSquid.png";
import image3 from "../src/assets/BakedSalmonwithVeg.png";
import image4 from "../src/assets/BakedHam.png";
import image5 from "../src/assets/ShrimpPasta.png";
import image6 from "../src/assets/StrawberryCake.png";

const list = async (credentials, signal) => {
  try {
    let response = await fetch('/api/recipes/', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const defaultRecipes = [
  { id: "1", title: "Fried Pork Belly", preptime: 30, cooktime: 35, servings: 4, image: image1, isDefault: true },
  { id: "2", title: "Grilled Squid", preptime: 20, cooktime: 30, servings: 2, image: image2, isDefault: true },
  { id: "3", title: "Baked Salmon with Vegies", preptime: 20, cooktime: 30, servings: 5, image: image3, isDefault: true },
  { id: "4", title: "Baked Ham", preptime: 10, cooktime: 45, servings: 8, image: image4, isDefault: true },
  { id: "5", title: "Shrimp Pasta", preptime: 20, cooktime: 45, servings: 6, image: image5, isDefault: true },
  { id: "6", title: "Strawberry Cake", preptime: 40, cooktime: 60, servings: 10, image: image6, isDefault: true },
];

const RecipeCarousel = ({ featuredRecipes, handleViewRecipe }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
      setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        setScrollPosition(container.scrollLeft);
      };
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollRight(container.scrollWidth > container.clientWidth);
    }
  }, [featuredRecipes]);

  const canScrollLeft = scrollPosition > 0;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '0 40px' }}>
      <IconButton
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': { backgroundColor: 'action.hover' },
          display: canScrollLeft ? 'flex' : 'none',
        }}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        <ChevronLeft />
      </IconButton>
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollBehavior: 'smooth',
        }}
      >
        {featuredRecipes && featuredRecipes.length > 0 ? featuredRecipes.map((recipe) => (
          <div key={recipe.id || recipe._id} style={{ minWidth: 300, maxWidth: 300, margin: '8px', flexShrink: 0 }}>
            <Card sx={{ height: 'auto' }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.title}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Prep: {recipe.preptime} min | Cook: {recipe.cooktime} min | Serves: {recipe.servings}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleViewRecipe(recipe)}
                  fullWidth
                >
                  VIEW RECIPE
                </Button>
              </CardContent>
            </Card>
          </div>
        )) : (
          <Typography variant="body1" style={{ padding: '16px' }}>No recipes available.</Typography>
        )}
      </div>
      <IconButton
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'background.paper',
          boxShadow: 2,
          '&:hover': { backgroundColor: 'action.hover' },
          display: canScrollRight ? 'flex' : 'none',
        }}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default function MemberHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();

    if (jwt) {
      fetchRecipes(jwt, signal);
    }

    return function cleanup() {
      abortController.abort();
    }
  }, []);

  const fetchRecipes = async (jwt, signal) => {
    try {
      setIsLoading(true);
      const data = await list({ t: jwt.token }, signal);
      if (data && data.error) {
        setError(data.error);
      } else {
        const dbRecipes = data.map(recipe => ({
          ...recipe,
          image: recipe.image || defaultRecipeImage,
          isDefault: false
        }));
        const sortedRecipes = dbRecipes.sort((a, b) => new Date(b.created) - new Date(a.created));
        setFeaturedRecipes(sortedRecipes.slice(0, 8));
        const allRecipesList = [...defaultRecipes, ...dbRecipes];
        setAllRecipes(allRecipesList);
        setFilteredRecipes(allRecipesList);
      }
    } catch (error) {
      setError("Could not load recipes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredRecipes(allRecipes);
    } else {
      handleSearch(e);
    }
  };

  const handleViewRecipe = (recipe) => {
    if (recipe.isDefault) {
      console.log("Viewing default recipe:", recipe.title);
      // Implement default recipe view logic here
    } else {
      navigate(`/viewrecipe?id=${recipe._id}`);
    }
  }

  if (isLoading) {
    return (
      <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main">
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

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
              onChange={handleSearchInputChange}
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
            Recently Added Recipes
          </Typography>
          <RecipeCarousel featuredRecipes={featuredRecipes} handleViewRecipe={handleViewRecipe} />
        </section>

        <section style={{ marginTop: '2rem' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {searchQuery ? 'Search Results' : 'All Recipes'}
          </Typography>
          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id || recipe._id}>
                <Card sx={{ height: 'auto' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={recipe.image}
                    alt={recipe.title}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
                      {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Prep: {recipe.preptime} min | Cook: {recipe.cooktime} min | Serves: {recipe.servings}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleViewRecipe(recipe)}
                      fullWidth
                    >
                      VIEW RECIPE
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {filteredRecipes.length === 0 && (
            <Typography variant="body1" align="center" style={{ marginTop: '2rem' }}>
              No recipes found matching your search.
            </Typography>
          )}
        </section>
      </Container>
    </div>
  );
}