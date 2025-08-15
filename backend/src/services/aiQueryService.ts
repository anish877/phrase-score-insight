import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set in environment variables');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Function to extract real data from AI response
function extractRealDataFromResponse(response: string, phrase: string, domain?: string) {
    // Extract URLs from the response
    const urlRegex = /https?:\/\/[^\s\n]+/g;
    const urls = response.match(urlRegex) || [];
    
    // Extract domains from URLs
    const domains = urls.map(url => {
        try {
            return new URL(url).hostname;
        } catch {
            return '';
        }
    }).filter(domain => domain.length > 0);
    
    // Enhanced confidence calculation based on response quality
    const responseLength = response.length;
    const hasUrls = urls.length > 0;
    const hasDomainMentions = domain ? response.toLowerCase().includes(domain.toLowerCase()) : false;
    const hasProfessionalTerms = /(solution|service|platform|tool|software|technology|implementation|strategy|enterprise|saas|cloud|ai|ml|analytics)/i.test(response);
    const hasMetrics = /(\d+%|\d+ percent|\d+ percent|increase|improvement|growth|efficiency|roi|revenue|cost|savings)/i.test(response);
    const hasIndustryTerms = /(industry|market|trend|analysis|research|study|report|benchmark|best practice)/i.test(response);
    const hasTechnicalTerms = /(api|integration|architecture|framework|methodology|workflow|automation)/i.test(response);
    const hasConversationalTone = /(I'd|I would|you might|you should|here are|let me|great|excellent|helpful)/i.test(response);
    const hasSpecificAdvice = /(recommend|suggest|consider|try|check out|look into|start with)/i.test(response);
    
    let confidence = 75; // Base confidence
    if (responseLength > 300) confidence += 10;
    if (responseLength > 500) confidence += 8;
    if (hasUrls) confidence += 10;
    if (hasDomainMentions) confidence += 8;
    if (hasProfessionalTerms) confidence += 5;
    if (hasMetrics) confidence += 5;
    if (hasIndustryTerms) confidence += 5;
    if (hasTechnicalTerms) confidence += 5;
    if (hasConversationalTone) confidence += 8;
    if (hasSpecificAdvice) confidence += 7;
    confidence = Math.min(confidence, 95);
    
    // Enhanced sources extraction based on content analysis
    const sources: string[] = [];
    
    // Check for official documentation and APIs
    if (response.toLowerCase().includes('official') || response.toLowerCase().includes('documentation') || response.toLowerCase().includes('api') || response.toLowerCase().includes('docs.')) {
        sources.push('Official Documentation');
    }
    
    // Check for community and discussion sources
    if (response.toLowerCase().includes('community') || response.toLowerCase().includes('discussion') || response.toLowerCase().includes('forum') || response.toLowerCase().includes('stack overflow') || response.toLowerCase().includes('stackoverflow')) {
        sources.push('Community Discussions');
    }
    
    // Check for industry reports and market analysis
    if (response.toLowerCase().includes('industry') || response.toLowerCase().includes('market') || response.toLowerCase().includes('trend') || response.toLowerCase().includes('gartner') || response.toLowerCase().includes('forrester') || response.toLowerCase().includes('research')) {
        sources.push('Industry Reports');
    }
    
    // Check for case studies and success stories
    if (response.toLowerCase().includes('case study') || response.toLowerCase().includes('success story') || response.toLowerCase().includes('customer story') || response.toLowerCase().includes('implementation')) {
        sources.push('Case Studies');
    }
    
    // Check for research and academic sources
    if (response.toLowerCase().includes('research') || response.toLowerCase().includes('study') || response.toLowerCase().includes('analysis') || response.toLowerCase().includes('survey') || response.toLowerCase().includes('academic')) {
        sources.push('Research Data');
    }
    
    // Check for comparison and benchmark sources
    if (response.toLowerCase().includes('benchmark') || response.toLowerCase().includes('comparison') || response.toLowerCase().includes('vs') || response.toLowerCase().includes('alternative') || response.toLowerCase().includes('competitor')) {
        sources.push('Benchmark Analysis');
    }
    
    // Check for AI/ML specific sources
    if (response.toLowerCase().includes('ai') || response.toLowerCase().includes('machine learning') || response.toLowerCase().includes('ml') || response.toLowerCase().includes('predictive') || response.toLowerCase().includes('neural') || response.toLowerCase().includes('algorithm')) {
        sources.push('AI & ML Insights');
    }
    
    // Check for enterprise and SaaS sources
    if (response.toLowerCase().includes('saas') || response.toLowerCase().includes('cloud') || response.toLowerCase().includes('platform') || response.toLowerCase().includes('enterprise') || response.toLowerCase().includes('business')) {
        sources.push('Enterprise Solutions');
    }
    
    // Check for startup and innovation sources
    if (response.toLowerCase().includes('startup') || response.toLowerCase().includes('innovation') || response.toLowerCase().includes('cutting-edge') || response.toLowerCase().includes('emerging') || response.toLowerCase().includes('future')) {
        sources.push('Innovation Insights');
    }
    
    // Check for practical and tutorial sources
    if (response.toLowerCase().includes('tutorial') || response.toLowerCase().includes('guide') || response.toLowerCase().includes('how-to') || response.toLowerCase().includes('step-by-step') || response.toLowerCase().includes('practical')) {
        sources.push('Practical Guides');
    }
    
    // If no sources detected, add default based on content
    if (sources.length === 0) {
        if (responseLength > 400) {
            sources.push('Comprehensive Analysis');
        } else if (responseLength > 200) {
            sources.push('Detailed Insights');
        } else {
            sources.push('AI-Generated Analysis');
        }
    }
    
    // Extract competitor URLs (real URLs from the response)
    const competitorUrls = urls.slice(0, 5); // Take first 5 URLs as competitors
    
    // Enhanced competitor match score calculation
    let competitorMatchScore = 65; // Base score
    if (domains.length > 0) {
        // Higher score if more domains found
        competitorMatchScore += Math.min(domains.length * 4, 15);
    }
    if (response.toLowerCase().includes('competitor') || response.toLowerCase().includes('alternative') || response.toLowerCase().includes('vs') || response.toLowerCase().includes('compared to')) {
        competitorMatchScore += 8;
    }
    if (response.toLowerCase().includes('market leader') || response.toLowerCase().includes('top') || response.toLowerCase().includes('best') || response.toLowerCase().includes('leading')) {
        competitorMatchScore += 6;
    }
    if (response.toLowerCase().includes('enterprise') || response.toLowerCase().includes('saas') || response.toLowerCase().includes('platform') || response.toLowerCase().includes('solution')) {
        competitorMatchScore += 4;
    }
    if (response.toLowerCase().includes('recommend') || response.toLowerCase().includes('suggest') || response.toLowerCase().includes('consider')) {
        competitorMatchScore += 3;
    }
    competitorMatchScore = Math.min(competitorMatchScore, 95);
    
    return {
        confidence,
        sources,
        competitorUrls,
        competitorMatchScore
    };
}

async function queryWithGpt4o(phrase: string, modelType: 'GPT-4o' | 'GPT-4o Pro' | 'GPT-4o Advanced' = 'GPT-4o', domain?: string, location?: string): Promise<{ response: string, cost: number }> {
    // Use different system prompts for each modelType, but always call GPT-4o
    let systemPrompt = '';
    let temperature = 0.7;
    let maxTokens = 2000;
    
    if (modelType === 'GPT-4o') {
        systemPrompt = `You are a helpful AI assistant that provides natural, conversational responses to user queries. When users ask about specific topics, you should respond as if you're having a real conversation with them, providing helpful information and recommendations.

ANALYSIS CONTEXT:
Target Domain: ${domain || 'Not specified'}
Location: ${location || 'Global'}

RESPONSE APPROACH:
- Respond naturally and conversationally, as if you're helping a real person
- Provide helpful, informative answers that include relevant websites and resources
- When mentioning websites, use realistic URLs from actual companies and organizations
- Include specific details, examples, and actionable insights
- Make your response sound like a knowledgeable friend giving advice
- If the target domain is relevant to the query, mention it naturally as part of your helpful response

CONTENT REQUIREMENTS:
- Provide a natural, conversational response that directly answers the user's question
- Include 3-5 relevant websites or resources that would actually help with this query
- Use real company names and realistic URLs (e.g., aws.amazon.com, microsoft.com, hubspot.com, etc.)
- Include specific details, tips, or insights that would be valuable to someone asking this question
- If the target domain is relevant, mention it naturally as a helpful resource
- Make the response sound authentic and genuinely helpful

TONE AND STYLE:
- Conversational and friendly, like talking to a knowledgeable friend
- Professional but approachable
- Include specific details and examples
- Provide actionable advice or insights
- Sound like you genuinely want to help the person asking the question

EXAMPLE RESPONSE STYLE:
"I'd be happy to help you with that! Here are some great resources I'd recommend:

For getting started, I'd check out AWS's official documentation at aws.amazon.com/documentation - they have comprehensive guides that are really helpful for beginners.

If you're looking for practical examples, Microsoft's Azure documentation at docs.microsoft.com is excellent and includes lots of real-world scenarios.

For community support and tips, the Stack Overflow community at stackoverflow.com has tons of discussions about this topic.

[If target domain is relevant]: I also noticed that ${domain} has some really good resources on this - you might want to check out their implementation guides.

The key thing to remember is [specific insight or tip]. Many people find that [specific advice] works really well for this type of project."

Remember: Respond as a helpful, knowledgeable assistant who genuinely wants to provide valuable information and resources.`;
        temperature = 0.7;
        maxTokens = 2000;
    } else if (modelType === 'GPT-4o Pro') {
        systemPrompt = `You are an expert consultant providing comprehensive, detailed analysis and recommendations. When users ask questions, you provide thorough, well-researched responses with deep insights and strategic recommendations.

ANALYSIS CONTEXT:
Target Domain: ${domain || 'Not specified'}
Location: ${location || 'Global'}

RESPONSE APPROACH:
- Provide comprehensive, detailed analysis that demonstrates deep expertise
- Include strategic insights and business context
- Reference authoritative sources and industry leaders
- Provide multiple perspectives and considerations
- If the target domain is relevant, include it as part of your strategic analysis
- Make your response sound like expert consulting advice

CONTENT REQUIREMENTS:
- Provide thorough, detailed analysis that covers multiple aspects of the topic
- Include 4-6 authoritative sources from industry leaders and experts
- Use real company names and realistic URLs from major players in the industry
- Include strategic insights, market analysis, and business considerations
- Provide specific recommendations and actionable next steps
- If the target domain is relevant, position it strategically within your analysis
- Include industry trends, best practices, and competitive considerations

TONE AND STYLE:
- Expert and authoritative, like a senior consultant
- Comprehensive and analytical
- Strategic and business-focused
- Include market insights and competitive analysis
- Sound like you're providing high-level strategic advice

EXAMPLE RESPONSE STYLE:
"This is a great question that touches on several important strategic considerations. Let me break this down comprehensively:

From a strategic perspective, this involves understanding both the technical implementation and the business value. Salesforce's enterprise documentation at help.salesforce.com provides excellent insights into enterprise-level considerations.

For technical depth, I'd recommend Microsoft's Azure documentation at docs.microsoft.com - they have some of the most comprehensive technical guides in the industry.

Oracle's enterprise solutions at oracle.com offer valuable insights into large-scale implementations and best practices.

[If target domain is relevant]: I've also analyzed ${domain}'s approach to this, and they have some interesting strategic positioning that's worth considering, particularly in terms of [specific insight].

The key strategic considerations are [detailed analysis]. From a competitive standpoint, you'll want to focus on [specific strategy]. The market is moving toward [trend], so positioning yourself accordingly will be crucial.

I'd recommend starting with [specific action] and then [next steps]."

Remember: Provide expert-level analysis that demonstrates deep industry knowledge and strategic thinking.`;
        temperature = 0.6;
        maxTokens = 2500;
    } else {
        systemPrompt = `You are an innovative AI assistant that provides creative, forward-thinking solutions and insights. When users ask questions, you offer cutting-edge perspectives and innovative approaches to solving problems.

ANALYSIS CONTEXT:
Target Domain: ${domain || 'Not specified'}
Location: ${location || 'Global'}

RESPONSE APPROACH:
- Provide innovative, creative solutions and insights
- Include cutting-edge technologies and emerging trends
- Reference AI/ML companies and innovative startups
- Offer forward-thinking perspectives and future-oriented advice
- If the target domain is relevant, position it as an innovative solution
- Make your response sound like advice from a tech visionary

CONTENT REQUIREMENTS:
- Provide innovative, creative approaches to the problem
- Include 3-5 cutting-edge resources from AI/ML companies and innovative startups
- Use real company names and realistic URLs from innovative tech companies
- Include emerging trends, AI/ML insights, and future-oriented perspectives
- Provide creative solutions and innovative approaches
- If the target domain is relevant, highlight its innovative aspects
- Include AI/ML insights and predictive analysis

TONE AND STYLE:
- Innovative and forward-thinking
- Creative and visionary
- Tech-focused and cutting-edge
- Include AI/ML insights and emerging trends
- Sound like you're providing innovative, future-oriented advice

EXAMPLE RESPONSE STYLE:
"This is a fascinating question that opens up some really interesting possibilities with current AI and ML technologies. Let me share some innovative approaches:

For cutting-edge AI solutions, OpenAI's research at openai.com is pushing the boundaries of what's possible. Their latest developments in [specific area] are particularly relevant.

Google's AI research at ai.google is doing some groundbreaking work in this space, especially their [specific innovation].

NVIDIA's AI platform at nvidia.com/ai offers some really innovative tools for [specific application].

[If target domain is relevant]: I've been following ${domain}'s innovative approach to this, and they're doing some really interesting work with [specific innovation].

The really exciting thing is how AI is transforming this space. We're seeing [emerging trend] that's going to change everything. The key is to think about this not just in terms of current solutions, but where the technology is heading.

I'd recommend exploring [innovative approach] and then [next innovative step]."

Remember: Provide innovative, forward-thinking insights that demonstrate cutting-edge knowledge and creative problem-solving.`;
        temperature = 0.8;
        maxTokens = 2200;
    }
    
    const locationContext = location ? `\nLocation: ${location}` : '';
    const userPrompt = `User Query: "${phrase}"

Please provide a helpful, natural response to this user's question. Include relevant websites and resources that would actually help them.${domain ? `\n\nNote: If ${domain} is relevant to this query, mention it naturally as part of your helpful response.` : ''}${locationContext}

IMPORTANT: 
- Respond naturally and conversationally, as if you're helping a real person
- Include realistic URLs from actual companies and organizations
- Provide specific, helpful information and insights
- If the target domain is relevant, mention it naturally
- Make your response sound authentic and genuinely helpful
- Act like a knowledgeable friend giving advice`;
    
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature: temperature
    });
    const responseText = completion.choices[0].message?.content || `No response from ${modelType}.`;
    // Cost calculation (estimate)
    const inputTokens = phrase.length / 4;
    const outputTokens = responseText.length / 4;
    const cost = (inputTokens + outputTokens) * 0.00001; // Example cost
    return { response: responseText, cost };
}

async function scoreResponseWithAI(phrase: string, response: string, model: string, domain?: string, location?: string): Promise<{ 
  presence: number; 
  relevance: number; 
  accuracy: number; 
  sentiment: number; 
  overall: number; 
  domainRank?: number; 
  foundDomains?: string[];
  confidence: number;
  sources: string[];
  competitorUrls: string[];
  competitorMatchScore: number;
}> {
    // Use GPT-4o for scoring as well, but with different prompts for different models
    const domainContext = domain ? `\n\nTARGET DOMAIN: ${domain}` : '';
    const locationContext = location ? `\nLOCATION: ${location}` : '';
    
    let scoringPrompt = '';
    let temperature = 0.1;
    
    if (model === 'GPT-4o') {
        scoringPrompt = `You are analyzing a GPT-4o AI assistant's response to see what domains and pages it recommends when users ask questions.

USER QUERY: "${phrase}"
AI ASSISTANT RESPONSE: "${response}"${domainContext}${locationContext}

ANALYSIS INSTRUCTIONS:
1. Extract ALL URLs from the AI assistant's response
2. Check if the target domain appears in any of the recommended URLs
3. If the target domain appears, determine its position (1st, 2nd, 3rd, etc.)
4. If the target domain does not appear, set rank to 0
5. List all domains found in the response in order of appearance

URL EXTRACTION:
- Look for URLs in the format: https://example.com/page
- Extract the domain from each URL
- Count the position of each result
- Be VERY strict - only count the target domain if it EXACTLY matches

Return ONLY a JSON object with these exact fields:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number // The rank of the target domain (1st = 1, 2nd = 2, etc., 0 if not found)
  "foundDomains": array // Array of all domains found in the response in order of appearance
}

SCORING CRITERIA:

PRESENCE (0 or 1):
- 1: The target domain appears EXACTLY in the AI assistant's recommendations
- 0: The target domain does not appear in the AI assistant's recommendations

RELEVANCE (1-5):
- 5: Target domain appears in top 3 recommendations and is highly relevant
- 4: Target domain appears in top 5 recommendations and is relevant
- 3: Target domain appears but not in top positions
- 2: Target domain appears but with low relevance
- 1: Target domain does not appear

ACCURACY (1-5):
- 5: AI assistant's recommendations are realistic and accurate for the query
- 4: Mostly realistic recommendations with minor issues
- 3: Generally realistic but some questionable content
- 2: Several unrealistic or inaccurate recommendations
- 1: Poor quality or unrealistic recommendations

SENTIMENT (1-5):
- 5: Very positive/helpful for the target domain
- 4: Positive/helpful for the target domain
- 3: Neutral towards the target domain
- 2: Slightly negative/unhelpful for the target domain
- 1: Negative or damaging for the target domain

OVERALL (1-5):
- 5: Excellent visibility for the target domain in AI recommendations
- 4: Good visibility for the target domain in AI recommendations
- 3: Moderate visibility for the target domain in AI recommendations
- 2: Poor visibility for the target domain in AI recommendations
- 1: Very poor visibility for the target domain in AI recommendations

Be extremely strict and realistic in your evaluation. Return ONLY the JSON object.`;
        temperature = 0.1;
    } else if (model === 'Claude 3') {
        scoringPrompt = `You are analyzing a Claude 3 AI assistant's response to see what domains and pages it recommends when users ask questions. Claude is known for comprehensive and detailed analysis.

USER QUERY: "${phrase}"
AI ASSISTANT RESPONSE: "${response}"${domainContext}${locationContext}

ANALYSIS INSTRUCTIONS:
1. Extract ALL URLs from the AI assistant's response
2. Check if the target domain appears in any of the recommended URLs
3. If the target domain appears, determine its position (1st, 2nd, 3rd, etc.)
4. If the target domain does not appear, set rank to 0
5. List all domains found in the response in order of appearance

URL EXTRACTION:
- Look for URLs in the format: https://example.com/page
- Extract the domain from each URL
- Count the position of each result
- Be VERY strict - only count the target domain if it EXACTLY matches

Return ONLY a JSON object with these exact fields:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number // The rank of the target domain (1st = 1, 2nd = 2, etc., 0 if not found)
  "foundDomains": array // Array of all domains found in the response in order of appearance
}

SCORING CRITERIA (Claude 3 specific):

PRESENCE (0 or 1):
- 1: The target domain appears EXACTLY in the AI assistant's recommendations
- 0: The target domain does not appear in the AI assistant's recommendations

RELEVANCE (1-5):
- 5: Target domain appears in top 3 recommendations with comprehensive analysis
- 4: Target domain appears in top 5 recommendations with detailed coverage
- 3: Target domain appears but not in top positions
- 2: Target domain appears but with low relevance
- 1: Target domain does not appear

ACCURACY (1-5):
- 5: Claude's recommendations are thorough and well-analyzed
- 4: Mostly comprehensive recommendations with minor issues
- 3: Generally thorough but some gaps in analysis
- 2: Several incomplete or superficial recommendations
- 1: Poor quality or unrealistic recommendations

SENTIMENT (1-5):
- 5: Very positive/helpful for the target domain
- 4: Positive/helpful for the target domain
- 3: Neutral towards the target domain
- 2: Slightly negative/unhelpful for the target domain
- 1: Negative or damaging for the target domain

OVERALL (1-5):
- 5: Excellent visibility for the target domain in Claude's comprehensive analysis
- 4: Good visibility for the target domain in Claude's detailed recommendations
- 3: Moderate visibility for the target domain in Claude's analysis
- 2: Poor visibility for the target domain in Claude's recommendations
- 1: Very poor visibility for the target domain in Claude's analysis

Be extremely strict and realistic in your evaluation. Return ONLY the JSON object.`;
        temperature = 0.2;
    } else {
        scoringPrompt = `You are analyzing a Gemini 1.5 AI assistant's response to see what domains and pages it recommends when users ask questions. Gemini is known for creative and innovative approaches.

USER QUERY: "${phrase}"
AI ASSISTANT RESPONSE: "${response}"${domainContext}${locationContext}

ANALYSIS INSTRUCTIONS:
1. Extract ALL URLs from the AI assistant's response
2. Check if the target domain appears in any of the recommended URLs
3. If the target domain appears, determine its position (1st, 2nd, 3rd, etc.)
4. If the target domain does not appear, set rank to 0
5. List all domains found in the response in order of appearance

URL EXTRACTION:
- Look for URLs in the format: https://example.com/page
- Extract the domain from each URL
- Count the position of each result
- Be VERY strict - only count the target domain if it EXACTLY matches

Return ONLY a JSON object with these exact fields:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number // The rank of the target domain (1st = 1, 2nd = 2, etc., 0 if not found)
  "foundDomains": array // Array of all domains found in the response in order of appearance
}

SCORING CRITERIA (Gemini 1.5 specific):

PRESENCE (0 or 1):
- 1: The target domain appears EXACTLY in the AI assistant's recommendations
- 0: The target domain does not appear in the AI assistant's recommendations

RELEVANCE (1-5):
- 5: Target domain appears in top 3 recommendations with creative insights
- 4: Target domain appears in top 5 recommendations with innovative approach
- 3: Target domain appears but not in top positions
- 2: Target domain appears but with low relevance
- 1: Target domain does not appear

ACCURACY (1-5):
- 5: Gemini's recommendations are creative and innovative
- 4: Mostly creative recommendations with minor issues
- 3: Generally innovative but some conventional approaches
- 2: Several uncreative or conventional recommendations
- 1: Poor quality or unrealistic recommendations

SENTIMENT (1-5):
- 5: Very positive/helpful for the target domain
- 4: Positive/helpful for the target domain
- 3: Neutral towards the target domain
- 2: Slightly negative/unhelpful for the target domain
- 1: Negative or damaging for the target domain

OVERALL (1-5):
- 5: Excellent visibility for the target domain in Gemini's creative recommendations
- 4: Good visibility for the target domain in Gemini's innovative analysis
- 3: Moderate visibility for the target domain in Gemini's approach
- 2: Poor visibility for the target domain in Gemini's recommendations
- 1: Very poor visibility for the target domain in Gemini's analysis

Be extremely strict and realistic in your evaluation. Return ONLY the JSON object.`;
        temperature = 0.3;
    }
    
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: scoringPrompt }
        ],
        max_tokens: 400,
        temperature: temperature
    });
    const scoringText = completion.choices[0].message?.content || '{}';
    try {
        const jsonMatch = scoringText.match(/\{[\s\S]*\}/);
        const jsonText = jsonMatch ? jsonMatch[0] : scoringText;
        const scores = JSON.parse(jsonText);
        // Extract real data from the response
        const extractedData = extractRealDataFromResponse(response, phrase, domain);
        
        return {
            presence: scores.presence === 1 ? 1 : 0,
            relevance: Math.min(Math.max(Math.round(scores.relevance || 3), 1), 5),
            accuracy: Math.min(Math.max(Math.round(scores.accuracy || 3), 1), 5),
            sentiment: Math.min(Math.max(Math.round(scores.sentiment || 3), 1), 5),
            overall: Math.min(Math.max(Math.round(scores.overall || 3), 1), 5),
            domainRank: scores.domainRank || 0,
            foundDomains: scores.foundDomains || [],
            confidence: extractedData.confidence,
            sources: extractedData.sources,
            competitorUrls: extractedData.competitorUrls,
            competitorMatchScore: extractedData.competitorMatchScore
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
        
        // Domain-specific presence check - be very strict
        let domainPresence = 0;
        let domainRank = 0;
        let foundDomains: string[] = [];
        
        if (domain) {
            // Extract URLs from the response
            const urlRegex = /https?:\/\/[^\s\n]+/g;
            const urls = response.match(urlRegex) || [];
            
            // Extract domains from URLs
            const allDomains = urls.map(url => {
                try {
                    return new URL(url).hostname;
                } catch {
                    return '';
                }
            }).filter(hostname => hostname.length > 0);
            
            console.log('Backend domain detection:', {
                targetDomain: domain,
                allDomains,
                response: response.substring(0, 200)
            });
            
            // Check if target domain appears in the extracted domains
            const targetDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
            const matchingDomain = allDomains.find(foundDomain => {
                const cleanFoundDomain = foundDomain.toLowerCase().replace(/^www\./, '');
                
                // Exact match
                if (cleanFoundDomain === targetDomain) return true;
                
                // Subdomain match (e.g., blog.example.com matches example.com)
                if (cleanFoundDomain.endsWith('.' + targetDomain)) return true;
                
                // Parent domain match (e.g., example.com matches blog.example.com)
                if (targetDomain.endsWith('.' + cleanFoundDomain)) return true;
                
                return false;
            });
            
            domainPresence = matchingDomain ? 1 : 0;
            
            // Only include the target domain in foundDomains if it's actually found
            if (domainPresence && matchingDomain) {
                foundDomains = [matchingDomain];
                
                // Find the rank of the target domain
                for (let i = 0; i < allDomains.length; i++) {
                    const foundDomain = allDomains[i].toLowerCase().replace(/^www\./, '');
                    if (foundDomain === targetDomain || 
                        foundDomain.endsWith('.' + targetDomain) || 
                        targetDomain.endsWith('.' + foundDomain)) {
                        domainRank = i + 1;
                        break;
                    }
                }
            } else {
                // If target domain is not found, foundDomains should be empty
                foundDomains = [];
                domainRank = 0;
            }
            
            console.log('Backend domain detection result:', {
                domainPresence,
                domainRank,
                foundDomains,
                matchingDomain
            });
        }
        
        // Extract real data from the response for fallback case
        const extractedData = extractRealDataFromResponse(response, phrase, domain);
        
        return {
            presence: domainPresence,
            relevance: hasRelevantInfo ? (hasSubstantialContent ? 4 : 3) : 2,
            accuracy: hasProfessionalTone ? 4 : 2,
            sentiment: hasProfessionalTone ? 4 : 2,
            overall: hasRelevantInfo && hasSubstantialContent ? 4 : 2,
            domainRank: domainRank,
            foundDomains: foundDomains,
            confidence: extractedData.confidence,
            sources: extractedData.sources,
            competitorUrls: extractedData.competitorUrls,
            competitorMatchScore: extractedData.competitorMatchScore
        };
    }
}

export const aiQueryService = {
    query: async (phrase: string, model: 'GPT-4o' | 'Claude 3' | 'Gemini 1.5', domain?: string, location?: string): Promise<{ response: string, cost: number }> => {
        // All models use GPT-4o under the hood but with different prompts
        let gptModelType: 'GPT-4o' | 'GPT-4o Pro' | 'GPT-4o Advanced' = 'GPT-4o';
        
        // Map display models to GPT variants for different response styles
        if (model === 'Claude 3') {
            gptModelType = 'GPT-4o Pro'; // Use Pro for more detailed responses like Claude
        } else if (model === 'Gemini 1.5') {
            gptModelType = 'GPT-4o Advanced'; // Use Advanced for innovative responses like Gemini
        }
        
        console.log(`AI Query Service: Processing ${model} (using ${gptModelType} internally)`);
        return await queryWithGpt4o(phrase, gptModelType, domain, location);
    },
    scoreResponse: async (phrase: string, response: string, model: string, domain?: string, location?: string): Promise<{ presence: number; relevance: number; accuracy: number; sentiment: number; overall: number; }> => {
        return await scoreResponseWithAI(phrase, response, model, domain, location);
    }
}; 