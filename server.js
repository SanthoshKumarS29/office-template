import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";
// files
import loadJson from './middleware/loadJson.js';
import siteRoutes from './routes/siteRoutes.js';
import dynamicSidebarRender from './middleware/dynamicSideBarRender.js';
import adminRouter from './admin/routes/adminRoutes.js';
import connectDb from './admin/config/db.js';
import blogRouter from './admin/routes/blogRoutes.js';


const app = express();

// Helpers to get __dirname in es modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// set View engine
app.set("view engine", "ejs");
app.set("views", [
    path.join(__dirname, "views"),
    path.join(__dirname, "admin/views")
]);


// static folder
app.use(express.static(path.join(__dirname, "public")));

// middleware
app.use(loadJson(['nav']));
app.use(dynamicSidebarRender);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
  })
);


// routes
app.use('/', siteRoutes);
app.use('/admin', adminRouter);
app.use('/admin', blogRouter);


// start Server
app.listen(2003, () => {
    console.log('Server is runnings')
    connectDb();
})

