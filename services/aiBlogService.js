import OpenAi from "openai";
import slugify from "../utils/slugify.js";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generatedBlogDraft = async({ topic, category, tone = "professional0" }) => {
    if (!topic || !topic.trim()) {
        throw new Error("Topic is required");
    }

    const prompt = `You are an expert SEO blog writer for a software company. Generate a blog article in valid JSON only.Return this exact structure:{"title":"string", "slug":"string","category":"string", "description":"string", "content":"string"}. Requirements: -Topic: ${topic} -Category: ${category || "General"} -Tone0: ${tone}  -The article must be original, useful, and written for a professional tech audience. -The title should be catchy and SEO-friendly - The slug should be URL-friendly - The description should be a short meta-like summary. - The content must be valid HTML and include headings, paragraphs, bullet points, and strong formatting. - Do not include markdown fences or extra text outside the JSON.`;

    const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.7,
        messages:[
            {
                "role": "system",
                "content": "You are a senior seo content writer and return only valid JSON."
            },
            {
                "role":"user",
                "content": prompt
            }
        ]
    });

    const aiText = response.choices[0]?.message?.content;
    if (!aiText){
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