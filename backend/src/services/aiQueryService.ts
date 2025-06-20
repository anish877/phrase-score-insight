import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function queryGemini(phrase: string, modelType: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5' = 'Gemini 1.5'): Promise<{ response: string, cost: number }> {
    try {
        // Different system prompts to simulate different AI models
        let systemPrompt = 'You are a helpful assistant providing a concise, one-paragraph answer.';
        
        if (modelType === 'GPT-4o') {
            systemPrompt = 'You are GPT-4o, OpenAI\'s most advanced AI model. Provide clear, accurate, and helpful responses in a conversational yet professional tone. Focus on being comprehensive while remaining concise.';
        } else if (modelType === 'Claude 3') {
            systemPrompt = 'You are Claude 3, Anthropic\'s AI assistant. Provide thoughtful, well-reasoned responses with a focus on safety and helpfulness. Use a warm, engaging tone while maintaining accuracy and clarity.';
        } else {
            // Gemini 1.5 default
            systemPrompt = 'You are Gemini 1.5, Google\'s advanced AI model. Provide informative, accurate responses with a balanced and helpful approach.';
        }

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    { 
                        role: "user",
                        parts: [{ text: `${systemPrompt}\n\nUser query: ${phrase}` }] 
                    }
                ],
                generationConfig: {
                    temperature: 0.5,
                    maxOutputTokens: 256,
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000
            }
        );
        const responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || `No response from ${modelType}.`;
        // Real cost calculation for Gemini
        const cost = (phrase.length / 1000 * 0.000125) + (responseText.length / 1000 * 0.000375);
        return { response: responseText, cost };
    } catch (error) {
        console.error(`${modelType} API Error:`, error);
        let message = 'Unknown error';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        return { response: `Error querying ${modelType}: ${message}`, cost: 0 };
    }
}

async function scoreResponseWithAI(phrase: string, response: string, model: string): Promise<{
    presence: number;
    relevance: number;
    accuracy: number;
    sentiment: number;
    overall: number;
}> {
    try {
        const scoringPrompt = `Score this AI response (1-5 scale, 0 or 1 for presence):

Query: "${phrase}"
Response: "${response}"

Return ONLY JSON: {"presence": 0, "relevance": 3, "accuracy": 3, "sentiment": 3, "overall": 3}

Presence: 1 if response addresses query topic, 0 if not
Relevance: How well it answers the query (1-5)
Accuracy: Factual correctness (1-5)  
Sentiment: Tone positivity (1-5)
Overall: Overall quality (1-5)`;

        const scoringResponse = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    { 
                        role: "user",
                        parts: [{ text: scoringPrompt }] 
                    }
                ],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 150,
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000
            }
        );

        const scoringText = scoringResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
        
        try {
            const jsonMatch = scoringText.match(/\{[\s\S]*\}/);
            const jsonText = jsonMatch ? jsonMatch[0] : scoringText;
            const scores = JSON.parse(jsonText);
            
            return {
                presence: scores.presence === 1 ? 1 : 0,
                relevance: Math.min(Math.max(Math.round(scores.relevance || 3), 1), 5),
                accuracy: Math.min(Math.max(Math.round(scores.accuracy || 3), 1), 5),
                sentiment: Math.min(Math.max(Math.round(scores.sentiment || 3), 1), 5),
                overall: Math.min(Math.max(Math.round(scores.overall || 3), 1), 5)
            };
        } catch (parseError) {
            // Fast fallback scoring
            const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
                response.toLowerCase().includes(term) && term.length > 2
            );
            const responseLength = response.length;
            
            return {
                presence: hasQueryTerms ? 1 : 0,
                relevance: hasQueryTerms ? (responseLength > 30 ? 4 : 3) : 2,
                accuracy: responseLength > 20 ? 3 : 2,
                sentiment: 3,
                overall: hasQueryTerms && responseLength > 20 ? 3 : 2
            };
        }
    } catch (error) {
        // Fast fallback scoring
        const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
            response.toLowerCase().includes(term) && term.length > 2
        );
        return {
            presence: hasQueryTerms ? 1 : 0,
            relevance: hasQueryTerms ? 3 : 2,
            accuracy: 3,
            sentiment: 3,
            overall: hasQueryTerms ? 3 : 2
        };
    }
}

export const aiQueryService = {
    query: async (phrase: string, model: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5'): Promise<{ response: string, cost: number }> => {
        // Use Gemini for all models with different system prompts
        return await queryGemini(phrase, model);
    },

    scoreResponse: async (phrase: string, response: string, model: string): Promise<{
        presence: number;
        relevance: number;
        accuracy: number;
        sentiment: number;
        overall: number;
    }> => {
        return await scoreResponseWithAI(phrase, response, model);
    }
}; 