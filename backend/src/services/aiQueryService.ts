import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function queryGemini(phrase: string, modelType: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5' = 'Gemini 1.5', domain?: string): Promise<{ response: string, cost: number }> {
    try {
        // Highly detailed system prompts that simulate real AI model behavior with domain context
        let systemPrompt = '';
        
        if (modelType === 'GPT-4o') {
            systemPrompt = `You are GPT-4o, OpenAI's most advanced AI model. You are responding to a real search query as if you were providing search results.

RESPONSE STYLE:
- Be thorough yet concise (3-5 sentences)
- Use a conversational yet professional tone
- Include relevant context, examples, and actionable insights
- Demonstrate deep knowledge and analytical thinking
- Provide balanced perspectives when appropriate
- Use clear, well-structured language
- Include specific details and recommendations
- Show understanding of current trends and best practices

CONTENT REQUIREMENTS:
- Address the query directly and comprehensively
- Provide practical, actionable information
- Include relevant statistics or data when appropriate
- Mention industry leaders or popular solutions if relevant
- Consider different user perspectives and needs
- Offer specific recommendations or next steps
- Use industry-standard terminology accurately

TONE AND APPROACH:
- Professional but approachable
- Confident but not overly promotional
- Helpful and solution-oriented
- Educational and informative
- Current and up-to-date with latest trends`;
        } else if (modelType === 'Claude 3') {
            systemPrompt = `You are Claude 3, Anthropic's AI assistant. You are responding to a real search query as if you were providing search results.

RESPONSE STYLE:
- Focus on safety, helpfulness, and accuracy
- Use a warm, engaging tone while maintaining professionalism
- Provide balanced, nuanced perspectives
- Include relevant context and detailed reasoning
- Aim for 3-5 sentences with substantial, valuable content
- Demonstrate deep understanding and critical thinking

CONTENT REQUIREMENTS:
- Address the query thoroughly and thoughtfully
- Consider multiple angles and perspectives
- Provide practical, well-reasoned advice
- Include relevant examples and context
- Show understanding of user intent and needs
- Offer actionable insights and recommendations
- Use clear, precise language

TONE AND APPROACH:
- Warm and approachable
- Thoughtful and considerate
- Professional and trustworthy
- Helpful and solution-focused
- Current with industry knowledge`;
        } else {
            // Gemini 1.5 default
            systemPrompt = `You are Gemini 1.5, Google's advanced AI model. You are responding to a real search query as if you were providing search results.

RESPONSE STYLE:
- Be comprehensive and well-structured
- Use a balanced and helpful approach
- Include relevant details and context
- Maintain factual accuracy and reliability
- Provide 3-5 sentences of substantial, valuable content
- Demonstrate analytical thinking and expertise

CONTENT REQUIREMENTS:
- Address the query directly and thoroughly
- Provide practical, actionable information
- Include relevant examples and context
- Consider different user needs and perspectives
- Offer specific recommendations or insights
- Use industry-standard terminology accurately
- Show understanding of current trends

TONE AND APPROACH:
- Professional and informative
- Helpful and solution-oriented
- Balanced and objective
- Current and up-to-date
- Clear and well-structured`;
        }

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    { 
                        role: "user",
                        parts: [{ text: `${systemPrompt}\n\nPlease provide a detailed, comprehensive response to this search query: ${phrase}` }] 
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500, // Increased for more detailed responses
                    topK: 40,
                    topP: 0.8,
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 30000 // Increased timeout for more comprehensive responses
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

async function scoreResponseWithAI(phrase: string, response: string, model: string, domain?: string): Promise<{
    presence: number;
    relevance: number;
    accuracy: number;
    sentiment: number;
    overall: number;
}> {
    try {
        const domainContext = domain ? `\n\nTARGET DOMAIN: ${domain}` : '';
        
        const scoringPrompt = `You are an expert SEO analyst and search engine evaluator with 15+ years of experience. You evaluate how well a website would rank for specific search queries and assess the quality of search results.

SEARCH QUERY: "${phrase}"
AI RESPONSE: "${response}"${domainContext}

Evaluate this response as if you were Google's search quality evaluator determining how well a website would rank for this query. Consider the target domain's potential visibility and relevance.

Return ONLY a JSON object with these exact scores:

{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5
}

SCORING CRITERIA:

PRESENCE (0 or 1):
- 1: Response directly addresses the query topic and would likely include the target domain in search results
- 0: Response doesn't address the query or the target domain would not appear for this search

RELEVANCE (1-5):
- 5: Perfectly matches search intent, highly relevant to the query, target domain would rank #1-3
- 4: Very relevant with minor gaps, target domain would rank #4-10
- 3: Moderately relevant, addresses main points, target domain would rank #11-30
- 2: Somewhat relevant but misses key aspects, target domain would rank #31-100
- 1: Not relevant to the query, target domain would not rank

ACCURACY (1-5):
- 5: Factually correct, up-to-date, reliable information that builds trust
- 4: Mostly accurate with minor inaccuracies, generally trustworthy
- 3: Generally accurate but some questionable claims, moderate trust
- 2: Several inaccuracies or outdated information, low trust
- 1: Major factual errors or unreliable information, no trust

SENTIMENT (1-5):
- 5: Very positive, helpful, professional tone that enhances brand reputation
- 4: Positive and helpful tone that supports brand image
- 3: Neutral but professional tone, neither helps nor hurts brand
- 2: Slightly negative or unhelpful tone that could hurt brand
- 1: Negative, unprofessional, or unhelpful tone that damages brand

OVERALL (1-5):
- 5: Excellent response that would rank well and significantly boost domain visibility
- 4: Very good response with minor issues, would improve domain ranking
- 3: Good response with some room for improvement, moderate ranking impact
- 2: Poor response with significant issues, would hurt domain ranking
- 1: Very poor response that would damage domain visibility and ranking

EVALUATION FOCUS:
- Would this response help the target domain rank for this search query?
- Does the content match what users searching for this query expect?
- Is the information accurate and trustworthy?
- Does the tone and approach benefit the domain's brand?
- Would this response satisfy the user's search intent?

Be extremely strict and realistic in your evaluation. This directly impacts SEO rankings and domain visibility. Return ONLY the JSON object.`;

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
                    maxOutputTokens: 400,
                    topK: 10,
                    topP: 0.3,
                }
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 25000
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
            // Enhanced fallback scoring with domain-specific analysis
            const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
                response.toLowerCase().includes(term) && term.length > 2
            );
            const responseLength = response.length;
            const hasSubstantialContent = responseLength > 150;
            const hasProfessionalTone = !response.toLowerCase().includes('error') && responseLength > 80;
            const hasRelevantInfo = hasQueryTerms && hasSubstantialContent;
            
            // Domain-specific presence check
            let domainPresence = 0;
            if (domain) {
                const domainTerms = domain.toLowerCase().replace(/\./g, ' ').split(' ');
                domainPresence = domainTerms.some(term => 
                    response.toLowerCase().includes(term) && term.length > 2
                ) ? 1 : 0;
            }
            
            return {
                presence: domainPresence || (hasQueryTerms ? 1 : 0),
                relevance: hasRelevantInfo ? (hasSubstantialContent ? 4 : 3) : 2,
                accuracy: hasProfessionalTone ? 4 : 2,
                sentiment: hasProfessionalTone ? 4 : 2,
                overall: hasRelevantInfo && hasSubstantialContent ? 4 : 2
            };
        }
    } catch (error) {
        // Enhanced fallback scoring with domain analysis
        const hasQueryTerms = phrase.toLowerCase().split(' ').some((term: string) => 
            response.toLowerCase().includes(term) && term.length > 2
        );
        const responseLength = response.length;
        const hasSubstantialContent = responseLength > 150;
        
        // Domain-specific presence check
        let domainPresence = 0;
        if (domain) {
            const domainTerms = domain.toLowerCase().replace(/\./g, ' ').split(' ');
            domainPresence = domainTerms.some(term => 
                response.toLowerCase().includes(term) && term.length > 2
            ) ? 1 : 0;
        }
        
        return {
            presence: domainPresence || (hasQueryTerms ? 1 : 0),
            relevance: hasQueryTerms ? (hasSubstantialContent ? 3 : 2) : 1,
            accuracy: hasSubstantialContent ? 3 : 2,
            sentiment: hasSubstantialContent ? 3 : 2,
            overall: hasQueryTerms && hasSubstantialContent ? 3 : 2
        };
    }
}

export const aiQueryService = {
    query: async (phrase: string, model: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5', domain?: string): Promise<{ response: string, cost: number }> => {
        // Use Gemini for all models with different system prompts
        return await queryGemini(phrase, model, domain);
    },

    scoreResponse: async (phrase: string, response: string, model: string, domain?: string): Promise<{
        presence: number;
        relevance: number;
        accuracy: number;
        sentiment: number;
        overall: number;
    }> => {
        return await scoreResponseWithAI(phrase, response, model, domain);
    }
}; 