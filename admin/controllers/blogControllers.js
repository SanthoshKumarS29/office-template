import Blog from '../../models/Blog.js';
import slugify from '../../utils/slugify.js';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), "public", "uploads", "blogs");

// Render a new blog form ( also used for edit)
export const renderBlogForm = async (req, res) => {
    const { id } = req.params;
    let blog = {}
    if (id) blog = await Blog.findById(id).lean() || {}
    res.render('dashboard', {
        partialView: 'blogForm',
        activePage: 'blogForm',
        blog
    })
}

// create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, slug: slugInput, category, description, content, status  } = req.body;
        const slug = slugInput ? slugify(slugInput) : slugify(title)
        let imagepath = "";
        if (req.file) imagepath = `/uploads/blogs/${req.file.filename}`;
        console.log("Uploaded file:", req.file);

        const exists = await Blog.findOne({ slug });
        if (exists) {
            // if slug exists, add Time or return error
            const uniqueSlug = `${slug}-${Date.now()}`;
            await Blog.create({ title, slug: uniqueSlug, category, description, image: imagepath, content, status: status || "draft", })
        } else {
            await Blog.create({ title, slug, category, description, image: imagepath, content, status: status || "draft", })
        }

        res.redirect('/admin/blogs'); //list page

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating blog. ' + error.message)
    }
}

// Update Blog
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug: slugInput, category, description, content, status } = req.body;
        const slug = slugInput ? slugify(slugInput) : slugify(title);
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).send("not found");

        // new file uploaded, delete the old file
        if (req.file) {
            if (blog.image) {
                const oldPath = path.join(process.cwd(), "public", blog.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            blog.image = `/uploads/blogs/${req.file.filename}`;
        }

        console.log("Uploaded file:", req.file);

        blog.title = title;
        blog.slug = slug;
        blog.category = category;
        blog.description = description;
        blog.content = content;
        blog.status = status || blog.status;

        console.log("Saved image path:", blog.image);

        await blog.save();
        res.redirect('/admin/blogs');

    } catch (error) {
        console.error(error);
        res.status(500).send("error updating blog: " + error.message)
    }
}

// Delete Blog
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (blog && blog.image) {
            const imagePath = path.join(process.cwd(), "public", blog.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }
        await Blog.findByIdAndDelete(id);
        res.redirect("/admin/blogs")
    } catch (error) {
        console.error(err);
        res.status(500).send("Error deleting blog: " + err.message);
    }
}

// list blog page
export const listBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
        res.render('dashboard', {
            partialView: 'pages/blogList',
            activePage: 'blogList',
            blogs
        })
    } catch (error) {
        console.error(err);
        res.status(500).send("Error loading blogs: " + err.message);
    }
}