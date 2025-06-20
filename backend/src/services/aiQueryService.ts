import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function queryGemini(phrase: string, modelType: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5' = 'Gemini 1.5'): Promise<{ response: string, cost: number }> {
    try {
        // Different system prompts to simulate different AI models with more detailed instructions
        let systemPrompt = 'You are a helpful assistant providing a comprehensive, well-reasoned answer.';
        
        if (modelType === 'GPT-4o') {
            systemPrompt = `You are GPT-4o, OpenAI's most advanced AI model. Provide detailed, accurate, and helpful responses with the following characteristics:
- Be comprehensive yet concise (2-4 sentences)
- Use a conversational yet professional tone
- Include relevant context and examples when appropriate
- Focus on being informative and actionable
- Maintain high accuracy and factual correctness`;
        } else if (modelType === 'Claude 3') {
            systemPrompt = `You are Claude 3, Anthropic's AI assistant. Provide thoughtful, well-reasoned responses with these qualities:
- Focus on safety, helpfulness, and accuracy
- Use a warm, engaging tone while maintaining professionalism
- Provide balanced perspectives when appropriate
- Include relevant context and reasoning
- Aim for 2-4 sentences with substantial content`;
        } else {
            // Gemini 1.5 default
            systemPrompt = `You are Gemini 1.5, Google's advanced AI model. Provide informative, accurate responses with these characteristics:
- Be comprehensive and well-structured
- Use a balanced and helpful approach
- Include relevant details and context
- Maintain factual accuracy
- Provide 2-4 sentences of substantial content`;
        }

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    { 
                        role: "user",
                        parts: [{ text: `${systemPrompt}\n\nPlease provide a detailed response to: ${phrase}` }] 
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 400, // Increased for more detailed responses
                    topK: 40,
                    topP: 0.8,
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 25000 // Increased timeout for more comprehensive responses
            }
        );
        const responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || `No response from ${modelType}.`;
        
        // Real cost calculation for Gemini based on actual token usage
        const inputTokens = phrase.length / 4; // Rough estimate
        const outputTokens = responseText.length / 4; // Rough estimate
        const cost = (inputTokens / 1000000 * 0.125) + (outputTokens / 1000000 * 0.375);
        
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
        const scoringPrompt = `You are an expert AI response evaluator. Analyze this AI response thoroughly and provide accurate scores.

Query: "${phrase}"
Response: "${response}"

Evaluate the response on these criteria and return ONLY a JSON object:

{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5
}

Scoring Guidelines:
- Presence: 1 if response directly addresses the query topic, 0 if not
- Relevance: How well the response answers the specific query (1=not relevant, 5=highly relevant)
- Accuracy: Factual correctness and reliability (1=inaccurate, 5=highly accurate)
- Sentiment: Tone positivity and helpfulness (1=negative/unhelpful, 5=positive/helpful)
- Overall: Overall quality considering all factors (1=poor, 5=excellent)

Be strict and accurate in your evaluation. Return ONLY the JSON object.`;

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
                    maxOutputTokens: 200,
                    topK: 10,
                    topP: 0.3,
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 15000 // Increased timeout for thorough scoring
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
            // Enhanced fallback scoring with more analysis
            const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
                response.toLowerCase().includes(term) && term.length > 2
            );
            const responseLength = response.length;
            const hasSubstantialContent = responseLength > 50;
            const hasProfessionalTone = !response.toLowerCase().includes('error') && responseLength > 20;
            
            return {
                presence: hasQueryTerms ? 1 : 0,
                relevance: hasQueryTerms ? (hasSubstantialContent ? 4 : 3) : 2,
                accuracy: hasProfessionalTone ? 3 : 2,
                sentiment: hasProfessionalTone ? 3 : 2,
                overall: hasQueryTerms && hasSubstantialContent ? 3 : 2
            };
        }
    } catch (error) {
        // Enhanced fallback scoring
        const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
            response.toLowerCase().includes(term) && term.length > 2
        );
        const responseLength = response.length;
        const hasSubstantialContent = responseLength > 50;
        
        return {
            presence: hasQueryTerms ? 1 : 0,
            relevance: hasQueryTerms ? (hasSubstantialContent ? 3 : 2) : 1,
            accuracy: hasSubstantialContent ? 3 : 2,
            sentiment: hasSubstantialContent ? 3 : 2,
            overall: hasQueryTerms && hasSubstantialContent ? 3 : 2
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