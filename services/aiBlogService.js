import OpenAi from "openai";
import slugify from "../utils/slugify.js";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAi({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:2003",
        "X-Title": "Office Site Blog Generator"
    }
});

export const generatedBlogDraft = async ({ topic, category, tone = "professional0" }) => {
    if (!topic || !topic.trim()) {
        throw new Error("Topic is required");
    }

    const prompt = `Generate an SEO-friendly technology blog. Return JSON only:{"title":"string", "slug":"string","category":"string", "description":"string", "content":"string"}. Requirements: -Topic: ${topic} -Category: ${category || "General"} -Tone: ${tone} Requirements: - Professional tech audience. Original and useful -SEO-friendly title -Short meta description. -Content must be valid HTML. -Include headings, paragraphs, bullet lists, and <strong> formatting, 1200-1500 words,- No Markdown,- No text outside JSON`;

    const response = await client.chat.completions.create({
        model: process.env.OPENROUTER_MODEL || "provider/Gemini 3.7 Flash:free",
        temperature: 0.7,
        response_format: { type: "json_object" },
        max_tokens: 4000,
        messages: [
            {
                "role": "system",
                "content": "You are an SEO blog writer. Return only valid JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    });

    const aiText = response.choices[0]?.message?.content;
    if (!aiText) {
        throw new Error("AI Returen no content");
    }

    const cleaned = aiText
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

    const parsed = JSON.parse(cleaned);

    return {
        title: parsed.title || "Untitled Blog",
        slug: slugify(parsed.slug || parsed.title || topic),
        category: parsed.category || category || "General",
        description: parsed.description || "",
        content: parsed.content || "",
    };
}