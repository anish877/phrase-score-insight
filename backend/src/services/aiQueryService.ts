import axios from 'axios';
import OpenAI from 'openai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set in environment variables');
if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set in environment variables');

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function queryGpt(phrase: string): Promise<{ response: string, cost: number }> {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'system', content: 'You are a helpful assistant providing a concise, one-paragraph answer.' }, { role: 'user', content: phrase }],
            model: 'gpt-4o',
        });
        const response = completion.choices[0]?.message?.content || 'No response from GPT-4o.';
        const inputTokens = completion.usage?.prompt_tokens || 0;
        const outputTokens = completion.usage?.completion_tokens || 0;
        const cost = (inputTokens / 1000000 * 5) + (outputTokens / 1000000 * 15);
        return { response, cost };
    } catch (error) {
        console.error('GPT-4o API Error:', error);
        let message = 'Unknown error';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        return { response: `Error querying GPT-4o: ${message}`, cost: 0 };
    }
}

async function queryGemini(phrase: string): Promise<{ response: string, cost: number }> {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: phrase }] }],
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
        const responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
        // Simplified cost calculation for Gemini
        const cost = (phrase.length / 1000 * 0.000125) + (responseText.length / 1000 * 0.000375);
        return { response: responseText, cost };
    } catch (error) {
        console.error('Gemini API Error:', error);
        let message = 'Unknown error';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        return { response: `Error querying Gemini: ${message}`, cost: 0 };
    }
}

export const aiQueryService = {
    query: async (phrase: string, model: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5'): Promise<{ response: string, cost: number }> => {
        switch (model) {
            case 'GPT-4o':
                return await queryGpt(phrase);
            case 'Claude 3': // Using GPT-4o as a substitute
                return await queryGpt(phrase);
            case 'Gemini 1.5':
                return await queryGemini(phrase);
            default:
                throw new Error(`Unknown model: ${model}`);
        }
    }
}; 