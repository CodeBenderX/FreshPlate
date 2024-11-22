import express from 'express' 
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from '../server/template.js'
import userRoutes from './Routes/user.routes.js'
import authRoutes from './Routes/auth.routes.js'
import recipeRoutes from './Routes/recipe.routes.js'
import contactRoutes from './Routes/contact.routes.js'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

    const app = express()
   /*... configure express ... */  

   const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
        const recipeId = req.body.recipeId;
        cb(null, `${recipeId}${path.extname(file.originalname)}`)
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));  

   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use('/', userRoutes)
   app.use('/', authRoutes)
   app.use('/', recipeRoutes)
   app.use('/', contactRoutes)
   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({ extended: true }))
   app.use(cookieParser())
   app.use(compress())
   app.use(helmet())
   app.use(cors())
   app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })  
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
        res.status(401).json({"error" : err.name + ": " + err.message}) 
        }else if (err) {
        res.status(400).json({"error" : err.name + ": " + err.message}) 
        console.log(err)
        } 
        })
          
   export default app
