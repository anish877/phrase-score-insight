import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set in environment variables');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function queryWithGpt4o(phrase: string, modelType: 'GPT-4o Mini' | 'Claude 3' | 'Gemini 1.5' = 'GPT-4o Mini', domain?: string, location?: string): Promise<{ response: string, cost: number }> {
    // Use different system prompts for each modelType, but always call GPT-4o
    let systemPrompt = '';
    if (modelType === 'GPT-4o Mini') {
        systemPrompt = `You are GPT-4o Mini, OpenAI's most advanced AI model. You are responding to a real search query as if you were providing search results.

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
    const locationContext = location ? `\nLocation: ${location}` : '';
    const userPrompt = `Please provide a detailed, comprehensive response to this search query: ${phrase}${domain ? `\nDomain: ${domain}` : ''}${locationContext}`;
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.7
    });
    const responseText = completion.choices[0].message?.content || `No response from ${modelType}.`;
    // Cost calculation (estimate)
    const inputTokens = phrase.length / 4;
    const outputTokens = responseText.length / 4;
    const cost = (inputTokens + outputTokens) * 0.00001; // Example cost
    return { response: responseText, cost };
}

async function scoreResponseWithAI(phrase: string, response: string, model: string, domain?: string, location?: string): Promise<{ presence: number; relevance: number; accuracy: number; sentiment: number; overall: number; }> {
    // Use GPT-4o for scoring as well
    const domainContext = domain ? `\n\nTARGET DOMAIN: ${domain}` : '';
    const locationContext = location ? `\nLOCATION: ${location}` : '';
    const scoringPrompt = `You are an advanced SEO analysis tool, simulating the behavior of a real-world search engine evaluator. Your job is to assess, with extreme realism and strictness, how likely it is that the TARGET DOMAIN would appear in the top search results for a given query, based on a simulated AI-generated SERP response.

SEARCH QUERY: "${phrase}"
AI RESPONSE: "${response}"${domainContext}${locationContext}

EVALUATION INSTRUCTIONS:
- Simulate a real-world Google SERP, considering domain authority, topical relevance, content quality, and the competitive landscape for the query.
- Only mark 'presence' as 1 if the target domain would realistically appear in the top results for this query, given the current SEO environment and competition.
- Consider if the domain is a true authority for the topic, has high-quality, relevant content, and would actually rank for this phrase.
- Be extremely strict and unbiased. Do NOT promote the domain unless it truly deserves to rank.
- Sentiment should reflect the tone and helpfulness of the response towards the domain, not just generic positivity.
- Use your knowledge of real SEO, ranking factors, and SERP analysis to make your judgment.
- If the domain is not mentioned or implied, or would not realistically rank, set 'presence' to 0 and 'domainFound' to an empty string.
- If the domain is found, specify exactly where (e.g., in the snippet, as a source, etc.) in 'domainFound'.

Return ONLY a JSON object with these exact fields:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainFound": string // The domain (or domains) you found in the response, or an empty string if none. If multiple, return as a comma-separated string or array.
}

SCORING CRITERIA:

PRESENCE (0 or 1):
- 1: The target domain would realistically appear in the top search results for this query, based on authority, content, and competition.
- 0: The domain would not appear, or is not mentioned/implied in the response.

RELEVANCE (1-5):
- 5: Perfectly matches search intent, highly relevant, domain would rank #1-3
- 4: Very relevant, minor gaps, domain would rank #4-10
- 3: Moderately relevant, domain would rank #11-30
- 2: Somewhat relevant, domain would rank #31-100
- 1: Not relevant, domain would not rank

ACCURACY (1-5):
- 5: Factually correct, up-to-date, reliable
- 4: Mostly accurate, minor issues
- 3: Generally accurate, some questionable claims
- 2: Several inaccuracies or outdated info
- 1: Major errors, unreliable

SENTIMENT (1-5):
- 5: Very positive/helpful for the domain
- 4: Positive/helpful
- 3: Neutral
- 2: Slightly negative/unhelpful
- 1: Negative or damaging

OVERALL (1-5):
- 5: Excellent, would boost domain visibility
- 4: Very good, minor issues
- 3: Good, some room for improvement
- 2: Poor, would hurt ranking
- 1: Very poor, would damage visibility

EVALUATION FOCUS:
- Would this response help the target domain rank for this search query?
- Does the content match what users expect?
- Is the information accurate and trustworthy?
- Does the tone/approach benefit the domain's brand?
- Would this response satisfy user intent?
- Which domain(s) are mentioned or implied? List them in 'domainFound'.

Be extremely strict and realistic in your evaluation. Return ONLY the JSON object.`;
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: scoringPrompt }
        ],
        max_tokens: 400,
        temperature: 0.1
    });
    const scoringText = completion.choices[0].message?.content || '{}';
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
    } catch {
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
}

export const aiQueryService = {
    query: async (phrase: string, model: 'GPT-4o Mini' | 'Claude 3' | 'Gemini 1.5', domain?: string, location?: string): Promise<{ response: string, cost: number }> => {
        return await queryWithGpt4o(phrase, model, domain, location);
    },
    scoreResponse: async (phrase: string, response: string, model: string, domain?: string, location?: string): Promise<{ presence: number; relevance: number; accuracy: number; sentiment: number; overall: number; }> => {
        return await scoreResponseWithAI(phrase, response, model, domain, location);
    }
}; 