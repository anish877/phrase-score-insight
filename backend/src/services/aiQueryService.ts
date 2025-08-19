import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not set in environment variables');
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Function to extract real data from AI response
function extractRealDataFromResponse(response: string, phrase: string, domain?: string) {
    // Extract URLs from the response
    const urlRegex = /https?:\/\/[^\s\n)\]}"']+/g;
    const urls = response.match(urlRegex) || [];
    
    // Extract domains from URLs
    const domains = urls.map(url => {
        try {
            return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
        } catch {
            return '';
        }
    }).filter(domain => domain.length > 0);
    
    // Enhanced confidence calculation based on response quality
    const responseLength = response.length;
    const hasUrls = urls.length > 0;
    const domainLower = (domain || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    const hasDomainMentions = domainLower ? (response.toLowerCase().includes(domainLower)) : false;
    const hasProfessionalTerms = /(solution|service|platform|tool|software|technology|implementation|strategy|enterprise|saas|cloud|ai|ml|analytics)/i.test(response);
    const hasMetrics = /(\d+%|\d+ percent|increase|improvement|growth|efficiency|roi|revenue|cost|savings)/i.test(response);
    const hasIndustryTerms = /(industry|market|trend|analysis|research|study|report|benchmark|best practice)/i.test(response);
    const hasTechnicalTerms = /(api|integration|architecture|framework|methodology|workflow|automation)/i.test(response);
    const hasConversationalTone = /(I'd|I would|you might|you should|here are|let me|great|excellent|helpful)/i.test(response);
    const hasSpecificAdvice = /(recommend|suggest|consider|try|check out|look into|start with)/i.test(response);
    
    // Calibrate confidence to avoid inflation to 95 for most cases
    let confidence = 50; // base
    if (responseLength > 300) confidence += 6;
    if (responseLength > 600) confidence += 5;
    if (hasUrls) confidence += Math.min(15, urls.length * 4);
    if (domains.length >= 3) confidence += 5;
    if (hasDomainMentions) confidence += 8;
    if (hasProfessionalTerms) confidence += 4;
    if (hasMetrics) confidence += 4;
    if (hasIndustryTerms) confidence += 3;
    if (hasTechnicalTerms) confidence += 3;
    if (hasConversationalTone) confidence += 2;
    if (hasSpecificAdvice) confidence += 3;

    // If there is no tangible evidence, cap more aggressively
    if (!hasUrls && !hasDomainMentions) {
        confidence = Math.min(confidence, 70);
    }

    // Final clamp
    confidence = Math.max(25, Math.min(confidence, 92));
    
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
    let competitorMatchScore = 60; // Base score tuned slightly lower
    if (domains.length > 0) {
        // Higher score if more domains found
        competitorMatchScore += Math.min(domains.length * 4, 15);
    }
    if (response.toLowerCase().includes('competitor') || response.toLowerCase().includes('alternative') || response.toLowerCase().includes('vs') || response.toLowerCase().includes('compared to')) {
        competitorMatchScore += 8;
    }
    if (response.toLowerCase().includes('market leader') || response.toLowerCase().includes('top') || response.toLowerCase().includes('best') || response.toLowerCase().includes('leading')) {
        competitorMatchScore += 5;
    }
    if (response.toLowerCase().includes('enterprise') || response.toLowerCase().includes('saas') || response.toLowerCase().includes('platform') || response.toLowerCase().includes('solution')) {
        competitorMatchScore += 3;
    }
    if (response.toLowerCase().includes('recommend') || response.toLowerCase().includes('suggest') || response.toLowerCase().includes('consider')) {
        competitorMatchScore += 2;
    }
    competitorMatchScore = Math.min(competitorMatchScore, 92);
    
    return {
        confidence,
        sources,
        competitorUrls,
        competitorMatchScore
    };
}

async function queryWithGpt4o(phrase: string, modelType: 'GPT-4o' | 'GPT-4o Pro' | 'GPT-4o Advanced' = 'GPT-4o', domain?: string, location?: string): Promise<{ response: string, cost: number }> {
    // No pre-context system prompts - let AI respond naturally
    let systemPrompt = '';
    let temperature = 0.7;
    let maxTokens = 2000;
    
    if (modelType === 'GPT-4o') {
        systemPrompt = `You are a helpful AI assistant. Provide natural, conversational responses to user questions. Include relevant websites, company domains, and resources when helpful.`;
        temperature = 0.7;
        maxTokens = 2000;
    } else if (modelType === 'GPT-4o Pro') {
        systemPrompt = `You are an expert consultant. Provide comprehensive analysis and recommendations with authoritative sources and company references.`;
        temperature = 0.6;
        maxTokens = 2500;
    } else {
        systemPrompt = `You are an innovative AI assistant. Provide creative solutions with references to companies and emerging technologies.`;
        temperature = 0.8;
        maxTokens = 2200;
    }
    
    const userPrompt = `"${phrase}"

Provide a helpful response to this question. Include relevant websites, company domains, and resources that would actually help. Respond naturally as if helping a real person.`;
    
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
    // Simplified scoring prompts for more natural LLM interaction
    const domainContext = domain ? `\nTarget Domain: ${domain}` : '';
    const locationContext = location ? `\nLocation: ${location}` : '';
    
    let scoringPrompt = '';
    let temperature = 0.1;
    
    if (model === 'GPT-4o') {
        scoringPrompt = `Analyze this AI response:

Query: "${phrase}"
Response: "${response}"${domainContext}${locationContext}

Extract all URLs, company domains, and check if target domain appears. Score response quality.

Return ONLY this JSON:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number,
  "foundDomains": array
}`;
        temperature = 0.1;
    } else if (model === 'Claude 3') {
        scoringPrompt = `Analyze this AI response:

Query: "${phrase}"
Response: "${response}"${domainContext}${locationContext}

Extract all URLs, company domains, and check if target domain appears. Score analysis quality.

Return ONLY this JSON:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number,
  "foundDomains": array
}`;
        temperature = 0.2;
    } else {
        scoringPrompt = `Analyze this AI response:

Query: "${phrase}"
Response: "${response}"${domainContext}${locationContext}

Extract all URLs, company domains, and check if target domain appears. Score response quality.

Return ONLY this JSON:
{
  "presence": 0 or 1,
  "relevance": 1-5,
  "accuracy": 1-5, 
  "sentiment": 1-5,
  "overall": 1-5,
  "domainRank": number,
  "foundDomains": array
}`;
        temperature = 0.3;
    }
    
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'You are an analysis assistant. Extract URLs, domains, and score responses.' },
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
        // Extract evidence from the actual response
        const extractedData = extractRealDataFromResponse(response, phrase, domain);

        // Derive presence and rank strictly from URLs/domains in the response
        let presence = scores.presence === 1 ? 1 : 0;
        let domainRank = scores.domainRank || 0;
        let foundDomains: string[] = [];
        if (domain) {
            const urlRegex = /https?:\/\/[^\s\)\]}"']+/g;
            const urls: string[] = response.match(urlRegex) || [];
            const allDomains: string[] = urls.map(u => {
                try { return new URL(u).hostname.toLowerCase().replace(/^www\./, ''); } catch { return ''; }
            }).filter(Boolean);
            const target = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
            for (let i = 0; i < allDomains.length; i++) {
                const d = allDomains[i];
                if (d === target || d.endsWith('.' + target) || target.endsWith('.' + d)) {
                    presence = 1;
                    domainRank = i + 1; // 1-based
                    break;
                }
            }
            foundDomains = Array.from(new Set(allDomains));
        }
        
        // Reweight scores: prioritize visibility first, then rank
        const baseRel = Math.min(Math.max(Math.round(scores.relevance || 3), 1), 5);
        const baseOverall = Math.min(Math.max(Math.round(scores.overall || 3), 1), 5);
        const finalRelevance = presence ? Math.min(5, baseRel + 1) : Math.max(1, baseRel - 1);
        const finalOverall = presence
          ? (domainRank <= 1 ? 5 : domainRank <= 3 ? Math.max(4, baseOverall) : domainRank <= 5 ? Math.max(4, baseOverall - 0) : Math.max(3, baseOverall - 1))
          : Math.max(2, baseOverall - 1);

        // Calibrate final confidence based on evidence and visibility
        let finalConfidence = extractedData.confidence;
        if (presence) finalConfidence += 5;
        if (domainRank && domainRank > 0) {
          if (domainRank === 1) finalConfidence += 5;
          else if (domainRank <= 3) finalConfidence += 3;
        }
        const hasUrls = (foundDomains && foundDomains.length > 0);
        if (!hasUrls) finalConfidence -= 10;
        finalConfidence = Math.max(20, Math.min(95, Math.round(finalConfidence)));

        return {
            presence,
            relevance: finalRelevance,
            accuracy: Math.min(Math.max(Math.round(scores.accuracy || 3), 1), 5),
            sentiment: Math.min(Math.max(Math.round(scores.sentiment || 3), 1), 5),
            overall: finalOverall,
            domainRank,
            foundDomains,
            confidence: finalConfidence,
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
                    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
                } catch {
                    return '';
                }
            }).filter(hostname => hostname.length > 0);
            
            // Check if target domain appears in the extracted domains
            const targetDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
            const matchingIndex = allDomains.findIndex(foundDomain => {
                const cleanFoundDomain = foundDomain.toLowerCase().replace(/^www\./, '');
                return (
                  cleanFoundDomain === targetDomain ||
                  cleanFoundDomain.endsWith('.' + targetDomain) ||
                  targetDomain.endsWith('.' + cleanFoundDomain)
                );
            });
            
            domainPresence = matchingIndex >= 0 ? 1 : 0;
            if (domainPresence) {
              domainRank = matchingIndex + 1;
              foundDomains = Array.from(new Set(allDomains));
            } else {
              foundDomains = [];
              domainRank = 0;
            }
        }
        
        // Extract real data from the response for fallback case
        const extractedData = extractRealDataFromResponse(response, phrase, domain);
        let finalConfidence = extractedData.confidence;
        if (domainPresence) finalConfidence += 5;
        if (!foundDomains.length) finalConfidence -= 10;
        finalConfidence = Math.max(20, Math.min(95, Math.round(finalConfidence)));
        
        return {
            presence: domainPresence,
            relevance: hasRelevantInfo ? (hasSubstantialContent ? 4 : 3) : 2,
            accuracy: hasProfessionalTone ? 4 : 2,
            sentiment: hasProfessionalTone ? 4 : 2,
            overall: hasRelevantInfo && hasSubstantialContent ? 4 : 2,
            domainRank: domainRank,
            foundDomains: foundDomains,
            confidence: finalConfidence,
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