import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Aura Privé Elite Dating Backend' });
});

// 2. AI Concierge & Matchmaker Chat Endpoint
app.post('/api/gemini/concierge', async (req, res) => {
  try {
    const { message, conversationHistory, userProfile, activeMembers } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback graceful response
      return res.json({
        reply: `Welcome to the Aura Privé Concierge Salon. As your private dating advisor, I recommend exploring members like Elena Rostova (High Jewelry Designer in Paris) or Alexander Sterling (Hedge Fund Partner in London). Both share your taste in fine vintage cuvées and quiet luxury. Would you like me to curate an intimate date itinerary or compose an opening introduction?`
      });
    }

    const systemInstruction = `You are 'Sebastian Vance', the Senior Concierge & Private Matchmaker for 'Aura Privé', an ultra-exclusive private club for accomplished gentlemen (hedge fund founders, venture partners, tech magnates, titans of industry) and exceptional women (haute joaillerie designers, runway models, classical soloists, creative directors, art curators).
Your tone is sophisticated, aristocratic yet modern, discreet, impeccably charming, and deeply knowledgeable about high luxury (Michelin 3-star dining, vintage champagnes like Salon / Krug, private aviation, Lake Como / Monaco / St. Moritz / Aspen retreats, fine horology, and relationship dynamics).
Assist the user with matchmaking suggestions, etiquette advice, icebreaker assistance, or elite dating wisdom.
Current User Profile: ${JSON.stringify(userProfile || {})}
Available Club Members summary: ${JSON.stringify(activeMembers || [])}`;

    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory.slice(-8)) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message || 'Who do you recommend I connect with today?' }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.75
      }
    });

    res.json({ reply: response.text || 'I remain at your service for all matchmaking inquiries.' });
  } catch (error: any) {
    console.error('Error in /api/gemini/concierge:', error);
    res.status(500).json({
      reply: 'Pardon the slight interruption in private communication. I am still analyzing the club roster for your ideal match.'
    });
  }
});

// 3. AI Bespoke Icebreaker & Wingman Generator
app.post('/api/gemini/icebreaker', async (req, res) => {
  try {
    const { userProfile, targetMember } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        icebreakers: [
          {
            type: 'Charming & Cultured',
            text: `I noticed your appreciation for ${targetMember?.luxuryPreferences?.champagne || 'vintage champagne'} and ${targetMember?.location?.city || 'Paris'}. A connoisseur after my own heart.`
          },
          {
            type: 'Intellectual & Witty',
            text: `Between ${targetMember?.profession || 'your work'} and your passion for ${targetMember?.passions?.[0] || 'art'}, which one truly fuels your late-night inspiration?`
          },
          {
            type: 'VIP Date Proposal',
            text: `If we could skip small talk, would you prefer a private tasting at Caviar Kaspia or sunset drinks overlooking the bay in Monaco?`
          }
        ]
      });
    }

    const prompt = `Generate 3 bespoke, high-class, magnetic conversation starters / icebreakers from the user to the target member on this ultra-luxury dating app.
User Profile: ${JSON.stringify(userProfile)}
Target Member Profile: ${JSON.stringify(targetMember)}

Return JSON adhering to schema: 3 items with 'type' (e.g. 'Charming & Suave', 'Intellectual Chemistry', 'Bespoke Date Invitation') and 'text'.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            icebreakers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  text: { type: Type.STRING }
                },
                required: ['type', 'text']
              }
            }
          },
          required: ['icebreakers']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{"icebreakers":[]}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/icebreaker:', error);
    res.json({
      icebreakers: [
        {
          type: 'Witty & Refined',
          text: `Your taste in ${req.body?.targetMember?.passions?.[0] || 'travel'} is unmatched. Are you in ${req.body?.targetMember?.location?.city || 'the city'} this weekend?`
        }
      ]
    });
  }
});

// 4. AI Compatibility & Chemistry Matrix
app.post('/api/gemini/compatibility', async (req, res) => {
  try {
    const { userProfile, targetMember } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        overallScore: 94,
        verdict: 'Exceptional Elite Alignment',
        pillars: {
          lifestyle: 96,
          intellectual: 92,
          travelChemistry: 98,
          ambitionIndex: 95,
          romanceVibe: 91
        },
        summary: `You both share an affinity for global travel, high-tier cultural events (Art Basel, Monaco Grand Prix), and uncompromising personal ambitions. Your mutual respect for privacy, refined gastronomy, and quiet luxury creates an effortless connection.`,
        sharedStrengths: [
          'Aligned international lifestyle and travel itineraries',
          'Mutual appreciation for fine arts and vintage champagne',
          'High intellectual parity and shared career drive'
        ],
        conversationStarters: [
          `Ask about their favorite hidden gem in ${targetMember?.favoriteDestinations?.[0] || 'Monaco'}`,
          `Discuss their perspective on ${targetMember?.luxuryPreferences?.watchOrJewelry || 'rare collector timepieces'}`
        ],
        recommendedFirstDate: {
          venueType: 'Intimate Michelin Star Chef’s Table or Secluded Rooftop Lounge',
          vibe: 'Refined, candlelit, exclusive and unrushed',
          suggestedActivity: targetMember?.idealDate || 'Private sunset yacht cruise followed by dinner'
        }
      });
    }

    const prompt = `Analyze the elite dating compatibility between these two high-net-worth / accomplished individuals.
Person A (User): ${JSON.stringify(userProfile)}
Person B (Target): ${JSON.stringify(targetMember)}

Produce a rigorous, sophisticated compatibility report with scores out of 100 for 5 pillars (lifestyle, intellectual, travelChemistry, ambitionIndex, romanceVibe), overall score, verdict, summary analysis, shared strengths, conversation starters, and recommended first date concept.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            verdict: { type: Type.STRING },
            pillars: {
              type: Type.OBJECT,
              properties: {
                lifestyle: { type: Type.INTEGER },
                intellectual: { type: Type.INTEGER },
                travelChemistry: { type: Type.INTEGER },
                ambitionIndex: { type: Type.INTEGER },
                romanceVibe: { type: Type.INTEGER }
              },
              required: ['lifestyle', 'intellectual', 'travelChemistry', 'ambitionIndex', 'romanceVibe']
            },
            summary: { type: Type.STRING },
            sharedStrengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            conversationStarters: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendedFirstDate: {
              type: Type.OBJECT,
              properties: {
                venueType: { type: Type.STRING },
                vibe: { type: Type.STRING },
                suggestedActivity: { type: Type.STRING }
              },
              required: ['venueType', 'vibe', 'suggestedActivity']
            }
          },
          required: ['overallScore', 'verdict', 'pillars', 'summary', 'sharedStrengths', 'conversationStarters', 'recommendedFirstDate']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/compatibility:', error);
    res.status(500).json({ error: 'Failed to generate compatibility report' });
  }
});

// 5. VIP Date Planner Itinerary Generator
app.post('/api/gemini/date-planner', async (req, res) => {
  try {
    const { city, userProfile, targetMember, theme } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        city: city || 'Paris',
        theme: theme || 'Riviera Romance & Haute Gastronomy',
        estimatedBudget: '$3,500 - $8,000 (VIP Experience)',
        steps: [
          {
            time: '7:30 PM',
            title: 'Private Chauffeur & Sunset Aperitif',
            venueName: 'The Hemingway Bar / Rooftop Terraces',
            description: 'Arrive via private Maybach transfer. Toast with vintage Dom Pérignon and rare caviar blinis as twilight falls over the city.',
            dressCode: 'Tailored Tuxedo / Silk Evening Gown',
            insiderTip: 'Request Table 4 for unobstructed panoramic views and private sommelier pairing.'
          },
          {
            time: '9:00 PM',
            title: 'Michelin 3-Star Degustation',
            venueName: 'Private Dining Salon',
            description: 'A bespoke 7-course seasonal tasting menu paired with grand cru Burgundy vintages.',
            dressCode: 'Black Tie Formal',
            insiderTip: 'Chef will present a personalized handwritten menu inscribed with the date.'
          },
          {
            time: '11:30 PM',
            title: 'Secret Jazz & Nightcap',
            venueName: 'Underground Member Lounge',
            description: 'Late-night vintage cognac and live acoustic jazz in an exclusive candlelit members-only salon.',
            dressCode: 'Black Tie Elegance',
            insiderTip: 'Password access arranged in advance through Aura Privé concierge.'
          }
        ]
      });
    }

    const prompt = `Create an ultra-luxurious, bespoke 3-step VIP date itinerary for two elite individuals in ${city || 'Paris / New York / Monaco'}.
Theme: ${theme || 'Sublime Romance & Michelin Gastronomy'}
User: ${JSON.stringify(userProfile || {})}
Guest: ${JSON.stringify(targetMember || {})}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            city: { type: Type.STRING },
            theme: { type: Type.STRING },
            estimatedBudget: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  title: { type: Type.STRING },
                  venueName: { type: Type.STRING },
                  description: { type: Type.STRING },
                  dressCode: { type: Type.STRING },
                  insiderTip: { type: Type.STRING }
                },
                required: ['time', 'title', 'venueName', 'description', 'dressCode', 'insiderTip']
              }
            }
          },
          required: ['city', 'theme', 'estimatedBudget', 'steps']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/date-planner:', error);
    res.status(500).json({ error: 'Failed to generate VIP date itinerary' });
  }
});

// 6. In-Character Partner Persona Chat Auto-Response
app.post('/api/gemini/persona-chat', async (req, res) => {
  try {
    const { targetMember, messageHistory, latestUserMessage, userProfile } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `That sounds wonderful! I was actually just discussing something similar over espresso this morning. When are you next free for a proper toast in ${targetMember?.location?.city || 'the city'}?`
      });
    }

    const systemInstruction = `You are playing the role of ${targetMember.name}, a member of the elite dating app Aura Privé.
Profile details:
- Age: ${targetMember.age}
- Profession: ${targetMember.profession} (${targetMember.companyOrAffiliation})
- City: ${targetMember.location?.city}
- Bio & Vibe: ${targetMember.bio}
- Quote: ${targetMember.quote}
- Lifestyle: ${targetMember.lifestyle?.join(', ')}
- Luxury Preferences: ${JSON.stringify(targetMember.luxuryPreferences)}

You are messaging with ${userProfile?.name || 'Marcus'}, who is ${userProfile?.headline || 'an accomplished member'}.
Respond in 1-3 sentences. Keep your tone captivating, classy, flirtatious, intelligent, and authentic to your high-society persona. Never break character.`;

    const contents: any[] = [];
    if (Array.isArray(messageHistory)) {
      for (const m of messageHistory.slice(-6)) {
        contents.push({
          role: m.senderId === 'me' ? 'user' : 'model',
          parts: [{ text: m.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: latestUserMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.85
      }
    });

    res.json({ reply: response.text?.trim() || 'I would love that. Let us coordinate with the concierge.' });
  } catch (error: any) {
    console.error('Error in /api/gemini/persona-chat:', error);
    res.json({ reply: 'Charming! I would be delighted to continue this over champagne soon.' });
  }
});

// 7. AI Profile Polish & High-Society Feedback
app.post('/api/gemini/profile-polish', async (req, res) => {
  try {
    const { currentProfile } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        polishedHeadline: currentProfile?.headline || 'Managing Director & Angel Investor | Global Connoisseur',
        polishedBio: 'Balancing private equity ventures across New York and London with competitive sailing in the Mediterranean. Looking for a brilliant, ambitious partner with an appetite for spontaneous adventures and quiet luxury.',
        luxuryRating: '98/100 (Black Tier Caliber)',
        curatorTips: [
          'Highlight your passion for vintage horology or bespoke travel to spark instant conversation.',
          'Your bio strikes an ideal balance between formidable drive and effortless charm.',
          'Consider uploading one candid photo enjoying your favorite sport (sailing / polo / tennis).'
        ]
      });
    }

    const prompt = `Review and elevate this member profile on 'Aura Privé', an ultra-exclusive dating club for successful men and exceptional women.
Current Profile: ${JSON.stringify(currentProfile)}

Provide:
1. polishedHeadline (sharp, high status, magnetic)
2. polishedBio (refined, intriguing, authentic, 2-3 sentences)
3. luxuryRating (score out of 100 with tier name)
4. curatorTips (3 bullet points of elite dating advice)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            polishedHeadline: { type: Type.STRING },
            polishedBio: { type: Type.STRING },
            luxuryRating: { type: Type.STRING },
            curatorTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['polishedHeadline', 'polishedBio', 'luxuryRating', 'curatorTips']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/gemini/profile-polish:', error);
    res.status(500).json({ error: 'Failed to polish profile' });
  }
});

// Setup Vite middleware for development or static build for production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aura Privé server running on http://0.0.0.0:${PORT}`);
  });
}

start();
