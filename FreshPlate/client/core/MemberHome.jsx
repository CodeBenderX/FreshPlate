// import React, { useState } from "react";
// import { Button, Typography, TextField, Container, Grid222 } from "@mui/material";
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
//     prepTime: 30,
//     cookTime: 35,
//     servings: 4,
//     image: image1,
//   },
//   {
//     id: "2",
//     title: "Grilled Squid",
//     prepTime: 20,
//     cookTime: 30,
//     servings: 2,
//     image: image2,
//   },
//   {
//     id: "3",
//     title: "Baked Salmon with Vegies",
//     prepTime: 20,
//     cookTime: 30,
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
//             <Grid222 container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid222 item xs={12} sm={6} md={4} key={recipe.id}>
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
//                           Prep: {recipe.prepTime} min | Cook: {recipe.cookTime}{" "}
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
//                 </Grid222>
//               ))}
//             </Grid222>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { Button, Typography, TextField, Container, Grid222 } from "@mui/material";
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
//             <Grid222 container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid222 item xs={12} sm={6} md={4} key={recipe.id}>
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
//                           Prep: {recipe.prepTime} min | Cook: {recipe.cookTime}{" "}
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
//                 </Grid222>
//               ))}
//             </Grid222>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Button, Typography, TextField, Container, Grid222, CircularProgress } from "@mui/material";
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
//             <Grid222 container spacing={3}>
//               {featuredRecipes.map((recipe) => (
//                 <Grid222 item xs={12} sm={6} md={4} key={recipe._id}>
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
//                           Prep: {recipe.prepTime} min | Cook: {recipe.cookTime}{" "}
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
//                 </Grid222>
//               ))}
//             </Grid222>
//           </Card>
//         </section>
//       </Container>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Container, Grid2, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import auth from "../lib/auth-helper";
import defaultRecipeImage from "../src/assets/defaultFoodImage.png";

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
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export default function MemberHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = auth.isAuthenticated();

    if (jwt) {
      fetchLatestRecipes(jwt, signal);
    }

    return function cleanup() {
      abortController.abort();
    }
  }, []);

  const fetchLatestRecipes = async (jwt, signal) => {
    try {
      setIsLoading(true);
      const data = await list({ t: jwt.token }, signal);
      if (data && data.error) {
        setError(data.error);
      } else {
        const limitedRecipes = data.slice(0, 8).map(recipe => ({
          ...recipe,
          image: recipe.image || defaultRecipeImage
        }));
        setFeaturedRecipes(limitedRecipes);
      }
    } catch (error) {
      setError("Could not load recipes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

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
            Featured Recipes
          </Typography>
          <Card>
            <Grid2 container spacing={3}>
              {featuredRecipes.map((recipe) => (
                <Grid2 item xs={12} sm={6} md={4} key={recipe._id}>
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
                        href={`/recipes/${recipe._id}`}
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