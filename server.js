import express from 'express';
import path from 'path';
// routes

import siteRoutes from './routes/siteRoutes.js';
import { fileURLToPath } from 'url';


const app = express();

// Helpers to get __dirname in es modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// static folder
app.use(express.static(path.join(__dirname, "public")));

app.use('/', siteRoutes);


// start Server
app.listen(2003, () => {
    console.log('Server is runnings')
})

