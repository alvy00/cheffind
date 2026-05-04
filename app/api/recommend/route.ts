/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { CHEFS } from "@/lib/constants";

export async function POST(req: NextRequest) {
    try {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY!,
        });

        const { data } = await req.json();

        const prompt = `
            You are a professional culinary matchmaking assistant. 
            Analyze the User Preferences against the Available Chefs.

            User Preferences: ${JSON.stringify(data)}
            Available Chefs: ${JSON.stringify(CHEFS)}

            STRICT REQUIREMENT: You MUST return EXACTLY 3 chefs in the "recommendedChefs" array. 
            - If you find 3 perfect matches, list them.
            - If you find fewer than 3 perfect matches, fill the remaining slots with the next best available chefs from the list (closest proximity in cuisine or price).
            - NEVER return fewer than 3 chefs.

            Each chef object MUST include all original fields from the list, 
            plus a new key "opinion" containing a 2-sentence explanation of why they were selected (or why they are the best alternative).

            JSON Schema Requirement:
            {
            "recommendedChefs": [
                {
                "id": number,
                "name": string,
                "cuisineSpeciality": string,
                "experience": string,
                "speciality": string,
                "rating": number,
                "pricePerSession": number,
                "opinion": string
                }
            ]
            }
        `;

        const modelsToTry = [
            "gemini-3-flash-preview",
            "gemini-2.5-flash",
            "gemini-2.5-flash-lite",
        ];

        let response;
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting match with model: ${modelName}`);

                response = await ai.models.generateContent({
                    model: modelName,
                    contents: prompt,
                });

                console.log(`Success with model: ${modelName}`);
                break;
            } catch (err: any) {
                lastError = err;

                const isRetryableError =
                    err?.status === 429 ||
                    err?.status === 503 ||
                    err?.status === 500 ||
                    err?.error?.code === 429 ||
                    err?.error?.code === 503 ||
                    err?.error?.status === "RESOURCE_EXHAUSTED" ||
                    err?.error?.status === "UNAVAILABLE";

                if (!isRetryableError) {
                    throw err;
                }

                console.warn(
                    `Model ${modelName} is busy (${err?.status}), trying next fallback...`,
                );
            }
        }

        if (!response) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Culinary AI is currently busy. Please try again in a moment.",
                },
                { status: 429 },
            );
        }

        const text = response.text ?? "{}";
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        let resultData = { recommendedChefs: [] };

        if (jsonMatch) {
            try {
                resultData = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
                console.error("Failed to parse AI JSON:", parseError);
            }
        }

        return NextResponse.json(resultData);
    } catch (error: any) {
        console.error("AI Recommendation Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 },
        );
    }
}
