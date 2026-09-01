
import Seo from "../models/Seo.js";
import Blog from "../models/Blog.js";

export const blogHubPage = async (req, res) => {
    try {
        const { slug } = req.params;
        const data = {
            url: slug
        }
        const { search = "", category = "all", page = 1 } = req.query;

        const limit = 6;
        const currentPage = Math.max(1, parseInt(page));
        const skip = (currentPage - 1) * limit;

        // SAFE base filter
        const filter = {
            status: { $regex: "^published$", $options: "i" }
        };

        // 🔍 Search filter
        if (search.trim()) {
            filter.title = { $regex: search.trim(), $options: "i" };
        }

        // 🏷 Category filter
        if (category && category !== "all") {
            filter.category = { $regex: `^${category}$`, $options: "i" };
        }

        // 📄 Fetch blogs
        const blogs = await Blog.find(filter)
            .select("title slug image category createdAt description")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // 📊 Pagination counts
        const totalBlogs = await Blog.countDocuments(filter);
        const totalPages = Math.ceil(totalBlogs / limit);

        // 🧠 WINDOWED PAGINATION LOGIC
        const pageWindow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(pageWindow / 2));
        let endPage = startPage + pageWindow - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pageWindow + 1);
        }

        // 📂 Categories
        const categories = await Blog.distinct("category");

        // Latest blogs (sidebar / section)
        const latestBlogs = await Blog.find({
            status: { $regex: "^published$", $options: "i" }
        })
            .select("title slug image category createdAt description")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();


        // 🧾 SEO
        const seoData = await Seo.findOne({ pageName: "blogList" }).lean();

        res.render("pages/blog/hubPage.ejs", {
            currentSection: "blog",
            latestBlogs,
            blogs,
            seo: seoData || {},
            currentPage,
            totalPages,
            startPage,
            endPage,
            search,
            selectedCategory: category,
            categories,
            pageData: data
        });

    } catch (err) {
        console.error("Blog list error:", err);
        res.status(500).send("Server error");
    }

};

export const blogDetailPage = async (req, res) => {
    const { slug } = req.params;
    const data = { url: slug}

    try {
        const blog = await Blog.findOne({ slug, status: "published" }).lean();
        if (!blog) return res.status(404).render("pages/static/notFound");

        let content = blog.content;
        const toc = [];

        // Match all h3 headings
        const headingRegex  = /<h3[^>]*>(.*?)<\/h3>/gi;
        let match;

        while ((match = headingRegex.exec(content)) !== null) {
            const text = match[1].replace(/<[^>]+>/g, "").trim();

            const id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            toc.push({ id, text });

            // Replace heading with ID injected
            content = content.replace(
                match[0],
                `<h3 id="${id}">${match[1]}</h3>`
            );
        }

        const relatedBlogs = await Blog.find({
            category: blog.category,
            slug: { $ne: slug },
            status: "published"
        })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();

        res.render("pages/blog/blogDetail.ejs", {
            relatedPage: "blogDetail",
            currentSection: "blogDetail",
            blog: {
                ...blog,
                content
            },
            toc,
            pageData: data,
            relatedBlogs
        });
    } catch (err) {
        console.error("Error loading blog:", err);
        res.status(500).send("Server error");
    }
};