export default function slugify(text) {
    return String(text || "")
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")   // remove non-word chars
        .replace(/\s+/g, "-")       // spaces to dashes
        .replace(/-+/g, "-")        // collapse multiple dashes
        .replace(/^-+|-+$/g, "");   // trim leading/trailing dashes
}