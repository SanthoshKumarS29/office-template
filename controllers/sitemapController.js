import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import Blog from '../models/Blog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BaseUrl = 'https://office-template.onrender.com';

const escapeXml = (value = "") => {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

const getJsonUrls = async (folder, urlPrefix) => {
    const folderPath = path.join(__dirname, `../public/dynamicDatas/${folder}`);
    const files = await fs.readdir(folderPath);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    return Promise.all(jsonFiles.map(async file => {
        const slug = path.basename(file, '.json');
        const filePath = path.join(folderPath, file);
        const stats = await fs.stat(filePath);

        return{
            url: `${urlPrefix}/${slug}`,
            lastmod: stats.mtime.toISOString()
        }
    }))

}

export const getSitemap = async (req, res) => {
    try {
        // static urls

        const staticUrls = [
            "/",
            "/trendings",
            "/products",
            "/services",
            "/blogs",
            "/company",
            "/contact-us"
        ].map(url => ({url, lastmod:null}));

        // json based urls
        const productUrls = await getJsonUrls("products", "/products");
        const serviceUrls = await getJsonUrls("service", "/service");
        const caseStudyUrls = await getJsonUrls("caseStudyDetail", "/company/case-study-detail");

        // published Blogs urls
        const blogs = await Blog.find({ status:"published"}).select("slug updatedAt").lean();
        const blogUrls = blogs.map(blog => ({
            url: `/blogs/${blog.slug}`,
            lastmod: blog.updatedAt ?  new Date(blog.updatedAt).toISOString() : null
        }))

        // combine all urls
        const urls = [...staticUrls, ...productUrls, ...serviceUrls, ...caseStudyUrls, ...blogUrls];

        // generate sitemap xml
        const xmlUrls = urls.map(item => {
            const lastmod = item.lastmod ? `<lastmod>${escapeXml(item.lastmod)}</lastmod>` : '';
            return `<url><loc>${escapeXml(BaseUrl + item.url)}</loc>${lastmod}</url>`;
        }).join('');

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
                        <urlset
                            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                        ${xmlUrls}
                        </urlset>`

        // send xml

        res.type("application/xml").send(xml);

    } catch (error) {
        console.error("Error generating sitemap:", error);
        res.status(500).send("Internal Server Error");
    }
}