import express from 'express';
// import mongoose from 'mongoose'; // for connecting to MongoDB if you're using it
import dotenv from 'dotenv'; // to load environment variables

dotenv.config(); // Load environment variables from a .env file

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB (if you're using a database for your recipes)
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((error) => console.error('Error connecting to MongoDB:', error));

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Website!');
});

// Sample route to get all recipes (placeholder)
app.get('/recipes', (req, res) => {
  res.json([
    // { id: 1, name: 'Sample', ingredients: ['sample', 'sample', 'sample'] },
    // { id: 2, name: 'Chocolate Chip Cookies', ingredients: ['flour', 'sugar', 'chocolate chips'] },
  ]);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
