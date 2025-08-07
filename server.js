import express from 'express';
import path from 'path';
// files
import loadJson from './middleware/loadJson.js';
import siteRoutes from './routes/siteRoutes.js';
import { fileURLToPath } from 'url';
import dynamicSidebarRender from './middleware/dynamicSideBarRender.js';


const app = express();

// Helpers to get __dirname in es modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// static folder
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(loadJson(['nav']));
app.use(dynamicSidebarRender)

// routes
app.use('/', siteRoutes);


// start Server
app.listen(2003, () => {
    console.log('Server is runnings')
})

