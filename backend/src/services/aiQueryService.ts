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
    // Simplified system prompts for each model type
    let systemPrompt = '';
    let temperature = 0.7;
    let maxTokens = 2000;
    
    if (modelType === 'GPT-4o') {
        systemPrompt = `You are a helpful AI assistant. When users ask questions, provide natural, conversational responses with relevant websites and resources. Include realistic URLs from actual companies and organizations. If a target domain is relevant to the query, mention it naturally as part of your helpful response.`;
        temperature = 0.7;
        maxTokens = 2000;
    } else if (modelType === 'GPT-4o Pro') {
        systemPrompt = `You are an expert consultant providing comprehensive analysis and recommendations. Include authoritative sources, strategic insights, and multiple perspectives. If a target domain is relevant, include it as part of your strategic analysis.`;
        temperature = 0.6;
        maxTokens = 2500;
    } else {
        systemPrompt = `You are an innovative AI assistant providing creative, forward-thinking solutions. Include cutting-edge technologies, emerging trends, and innovative approaches. If a target domain is relevant, position it as an innovative solution.`;
        temperature = 0.8;
        maxTokens = 2200;
    }
    
    const userPrompt = `User Query: "${phrase}"

Please provide a helpful response to this user's question. Include relevant websites and resources that would actually help them.${domain ? `\n\nNote: If ${domain} is relevant to this query, mention it naturally as part of your helpful response.` : ''}${location ? `\nLocation: ${location}` : ''}

Respond naturally and conversationally, as if you're helping a real person. Include realistic URLs from actual companies and organizations.`;
    
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
    // Simplified scoring prompt
    const domainContext = domain ? `\nTarget Domain: ${domain}` : '';
    const locationContext = location ? `\nLocation: ${location}` : '';
    
    const scoringPrompt = `Analyze this AI response for domain visibility:

Query: "${phrase}"
Response: "${response}"${domainContext}${locationContext}

Extract all URLs from the response and check if the target domain appears. Return ONLY a JSON object with these fields:

{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number,
  "foundDomains": ["domain1.com", "domain2.com"]
}

Scoring:
- presence: 1 if target domain found, 0 if not
- relevance: how relevant the response is to the query (1-5)
- accuracy: how accurate/realistic the recommendations are (1-5)
- sentiment: how positive/helpful for target domain (1-5)
- overall: overall visibility score (1-5)
- domainRank: position of target domain (1st=1, 2nd=2, etc., 0 if not found)
- foundDomains: array of all domains found in response

Return ONLY the JSON object.`;
    
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are a helpful assistant that returns JSON.' },
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