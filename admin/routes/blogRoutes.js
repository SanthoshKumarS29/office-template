import express from 'express';
import { createBlog, deleteBlog, generateAiBlog, listBlogs, renderBlogForm, saveGeneratedAiBlog, updateBlog } from '../controllers/blogControllers.js';
import { upload } from '../../utils/multer.js';


const blogRouter = express.Router();

blogRouter.get('/blogs', listBlogs);
blogRouter.get('/blogs/new', renderBlogForm);
blogRouter.post("/blogs/generate-ai", generateAiBlog);
blogRouter.post("/blogs/save-ai", saveGeneratedAiBlog);
blogRouter.post('/blogs', upload.single('image'), createBlog);
blogRouter.get('/blogs/:id/edit', renderBlogForm);
blogRouter.post('/blogs/:id', upload.single('image'), updateBlog);
blogRouter.post('/blogs/:id/delete', deleteBlog);

export default blogRouter;
