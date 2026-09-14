import OpenAi from "openai";
import slugify from "../utils/slugify.js";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAi({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": process.env.SITE_URL,
        "X-Title": "Office Site Blog Generator"
    }
});

// Maximum output budget
const BLOG_MAX_TOKENS = Number(
    process.env.BLOG_MAX_TOKENS || 3000
);

// Models to try
const MODELS = [
    process.env.OPENROUTER_MODEL || "openrouter/free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "inclusionai/ling-3.0-flash-vl:free",
    "google/gemma-4-31b-it:free",
    "google/gemma-4-26b-a4b-it:free"
].filter(Boolean);


export const generatedBlogDraft = async ({
    topic,
    category,
    tone = "professional"
}) => {

    if (!topic || !topic.trim()) {
        throw new Error("Topic is required");
    }

    const prompt = `
        Generate an SEO-friendly technology blog.

        Return JSON only in this exact structure:

        {
            "title": "string",
            "slug": "string",
            "category": "string",
            "description": "string",
            "content": "string"
        }

        Requirements:

        - Topic: ${topic}
        - Category: ${category || "General"}
        - Tone: ${tone}
        - Audience: Professional technology audience
        - Create original and useful content
        - Create an SEO-friendly title
        - Create a short meta description
        - Content must be valid HTML
        - Use <h2>, <h3>, <p>, <ul>, <li>, and <strong> where appropriate
        - No Markdown
        - No text outside the JSON object
        - Do not explain your reasoning
        - Do not include planning or analysis
        - Return the final JSON directly
        - Content should be approximately 800-1000 words`;

    let lastError;

    for (const model of MODELS) {

        try {

            console.log(`Trying model: ${model}`);

            const response =
                await client.chat.completions.create({
                    model,

                    temperature: 0.7,

                    response_format: {
                        type: "json_object"
                    },

                    max_completion_tokens:
                        BLOG_MAX_TOKENS,

                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an SEO blog writer. Return only the final JSON object. Never output reasoning, analysis, planning, or explanations."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                });


            // --------------------------------
            // DEBUG RESPONSE
            // --------------------------------

            const choice = response.choices?.[0];

            console.log("AI Model:", response.model);

            console.log(
                "Finish reason:",
                choice?.finish_reason
            );

            console.log(
                "Token usage:",
                {
                    model: response.model,
                    promptTokens:
                        response.usage?.prompt_tokens,
                    completionTokens:
                        response.usage?.completion_tokens,
                    totalTokens:
                        response.usage?.total_tokens,
                    reasoningTokens:
                        response.usage
                            ?.completion_tokens_details
                            ?.reasoning_tokens
                }
            );


            // --------------------------------
            // CHECK FINISH REASON
            // --------------------------------

            if (choice?.finish_reason === "length") {

                throw new Error(
                    `AI response was cut off because it reached the token limit. ` +
                    `Used ${response.usage?.completion_tokens || 0} completion tokens.`
                );
            }


            // --------------------------------
            // GET AI CONTENT
            // --------------------------------

            const aiText =
                choice?.message?.content;


            if (!aiText) {

                throw new Error(
                    `AI returned no content. Finish reason: ${choice?.finish_reason || "unknown"
                    }`
                );
            }


            console.log(
                "AI content preview:",
                aiText.substring(0, 500)
            );


            // --------------------------------
            // CLEAN RESPONSE
            // --------------------------------

            const cleaned = aiText
                .replace(/^```json\s*/i, "")
                .replace(/```$/i, "")
                .trim();


            // --------------------------------
            // PARSE JSON
            // --------------------------------

            let parsed;

            try {

                parsed = JSON.parse(cleaned);

            } catch (jsonError) {

                console.error(
                    "Invalid JSON returned by AI:"
                );

                console.error(cleaned);

                throw new Error(
                    `AI returned invalid JSON: ${jsonError.message}`
                );
            }


            // --------------------------------
            // VALIDATE REQUIRED FIELDS
            // --------------------------------

            if (
                !parsed.title ||
                !parsed.content
            ) {

                throw new Error(
                    "AI JSON is missing required fields: title or content"
                );
            }


            // --------------------------------
            // RETURN BLOG
            // --------------------------------

            return {
                title:
                    parsed.title ||
                    "Untitled Blog",

                slug:
                    slugify(
                        parsed.slug ||
                        parsed.title ||
                        topic
                    ),

                category:
                    parsed.category ||
                    category ||
                    "General",

                description:
                    parsed.description ||
                    "",

                content:
                    parsed.content ||
                    ""
            };


        } catch (error) {

            lastError = error;

            console.error(`Model failed: ${model}`);
            console.error({
                name: error.name,
                message: error.message,
                status: error.status,
                code: error.code,
                type: error.type,
                response: error.response?.data,
                // headers: error.headers
            })

            // Try next model
            continue;
        }
    }


    // --------------------------------
    // ALL MODELS FAILED
    // --------------------------------

    throw new Error(
        `All AI models failed. Last error: ${lastError?.message || "Unknown error"
        }`
    );
};