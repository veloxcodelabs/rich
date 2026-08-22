import { MemberProfile, LoungeEvent } from '../types';

export const INITIAL_MEMBERS: MemberProfile[] = [
  // --- FEMALE PROFILES ---
  {
    id: 'f-1',
    name: 'Elena Rostova',
    age: 26,
    gender: 'female',
    headline: 'High Jewelry Designer & Sotheby’s Alum',
    profession: 'Jewelry Designer & Gemologist',
    companyOrAffiliation: 'Maison Rostova / GIA Graduate',
    education: 'Central Saint Martins & GIA London',
    location: {
      city: 'Paris',
      country: 'France',
      neighborhood: 'Place Vendôme / 8th Arr.'
    },
    bio: 'Designing bespoke emerald and sapphire collections for private collectors. Passionate about classical opera at Palais Garnier, vintage Riva speedboats in Lake Como, and contemporary art.',
    quote: 'True luxury is discretion, exceptional intellect, and the courage to live without compromise.',
    height: "5'9\"",
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'GIA Gemologist', type: 'ivy_league' },
      { label: 'Black Tier Verified', type: 'black_card' },
      { label: 'Haute Horlogerie Juror', type: 'philanthropist' }
    ],
    lifestyle: ['Private Aviation', 'Contemporary Art Collector', 'Grand Prix Monaco', 'Equestrian'],
    interests: ['Fine Wine & Burgundy', 'Yachting', 'Architecture', 'Ballet', 'Rare Gems'],
    favoriteDestinations: ['Cap d’Antibes', 'St. Moritz', 'Kyoto', 'Monaco'],
    idealDate: 'Late evening champagne and caviar at Caviar Kaspia Paris, followed by a private midnight stroll across Pont Alexandre III.',
    passions: ['Haute Joaillerie', 'Art Basel', 'Opera', 'Polo'],
    luxuryPreferences: {
      champagne: 'Dom Pérignon P2 2004',
      watchOrJewelry: 'Cartier Crash & Custom Paraiba Tourmaline Ring',
      preferredGetaway: 'Villa d’Este, Lake Como',
      fineDining: 'L’Ambroisie (Paris) & Le Louis XV (Monaco)'
    },
    verified: true,
    activeStatus: 'In Paris',
    instagramHandle: '@elena.rostova.joaillerie'
  },
  {
    id: 'f-2',
    name: 'Serena Vanderveen',
    age: 28,
    gender: 'female',
    headline: 'International Runway Model & Philanthropist',
    profession: 'Fashion Model & Foundation Director',
    companyOrAffiliation: 'Elite World / Ocean Blue Foundation',
    education: 'Columbia University (Art History)',
    location: {
      city: 'New York',
      country: 'USA',
      neighborhood: 'SoHo & West Village'
    },
    bio: 'Balancing runway seasons across Milan and Paris with environmental philanthropy. Looking for an ambitious partner who values depth, intellectual banter, and spontaneous weekends in Aspen.',
    quote: 'Elegance is the only beauty that never fades.',
    height: "5'11\"",
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Elite Agency Verified', type: 'model_agency' },
      { label: 'Columbia Alum', type: 'ivy_league' },
      { label: 'Global Charity Chair', type: 'philanthropist' }
    ],
    lifestyle: ['Fashion Week Front Row', 'Pilates & Tennis', 'Helicopter Heli-Skiing', 'Sommelier Trainee'],
    interests: ['High Fashion', 'Sailing', 'Modern Philosophy', 'Biohacking', 'Film Festivals'],
    favoriteDestinations: ['Aspen', 'St. Tropez', 'St. Barths', 'Amalfi Coast'],
    idealDate: 'Omakase at Masa NYC followed by secret speakeasy cocktails in Tribeca, talking about life ambitions till 2 AM.',
    passions: ['Runway', 'Ocean Conservation', 'Modern Art', 'Tennis'],
    luxuryPreferences: {
      champagne: 'Krug Clos d’Ambonnay',
      watchOrJewelry: 'Audemars Piguet Royal Oak Frosted Gold',
      preferredGetaway: 'Eden Rock, St. Barths',
      fineDining: 'Eleven Madison Park (NYC)'
    },
    verified: true,
    activeStatus: 'Online',
    instagramHandle: '@serena.vanderveen'
  },
  {
    id: 'f-3',
    name: 'Camilla D’Angelo',
    age: 27,
    gender: 'female',
    headline: 'Classical Concert Violinist & Cultural Diplomat',
    profession: 'Concert Soloist & Recording Artist',
    companyOrAffiliation: 'Vienna Philharmonic Guest Soloist',
    education: 'Juilliard School of Music',
    location: {
      city: 'London',
      country: 'UK',
      neighborhood: 'Mayfair & Kensington'
    },
    bio: 'Touring European concert halls with a 1742 Guarneri del Gesù violin. When not on stage: discovering Michelin 3-star wine cellars, exploring old-world architecture, and skiing in Zermatt.',
    quote: 'Passion without discipline is chaos; discipline without passion is sterile.',
    height: "5'8\"",
    photos: [
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Juilliard Master', type: 'ivy_league' },
      { label: 'Royal Albert Soloist', type: 'forbes_30' },
      { label: 'Black Tier Verified', type: 'black_card' }
    ],
    lifestyle: ['European Philharmonic Tours', 'WSET Diploma', 'Patek Philippe Collector', 'Alpine Skiing'],
    interests: ['Classical Music', 'Vintage Bordeaux', 'Chess', 'Equestrian Dressage', 'Historic Estates'],
    favoriteDestinations: ['Vienna', 'Lake Geneva', 'Zermatt', 'Portofino'],
    idealDate: 'Private box seats at the Royal Opera House Covent Garden, followed by dinner at Alain Ducasse at The Dorchester.',
    passions: ['Concert Performance', 'Old Masters Art', 'Fine Horology'],
    luxuryPreferences: {
      champagne: 'Salon Blanc de Blancs Le Mesnil',
      watchOrJewelry: 'Breguet Reine de Naples',
      preferredGetaway: 'Badrutt’s Palace, St. Moritz',
      fineDining: 'The Ledbury (London)'
    },
    verified: true,
    activeStatus: 'Active today',
    instagramHandle: '@camilla.violin'
  },
  {
    id: 'f-4',
    name: 'Chloé Montmartre',
    age: 25,
    gender: 'female',
    headline: 'Creative Director & Luxury Brand Strategist',
    profession: 'Creative Director',
    companyOrAffiliation: 'Montmartre Studio / Vogue Contributor',
    education: 'Sciences Po Paris',
    location: {
      city: 'Dubai',
      country: 'UAE',
      neighborhood: 'Downtown & Palm Jumeirah'
    },
    bio: 'Bridging heritage luxury couture with cutting-edge visual experiences across the Gulf and Mediterranean. I appreciate refined manners, intellectual curiosity, and sharp wit.',
    quote: 'Style is a way to say who you are without having to speak.',
    height: "5'9\"",
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Forbes 30 Under 30', type: 'forbes_30' },
      { label: 'Vogue Featured', type: 'model_agency' },
      { label: 'Verified Identity', type: 'black_card' }
    ],
    lifestyle: ['Superyacht Escapes', 'Desert Polo Club', 'Private Member Clubs (Annabel’s, Arts Club)'],
    interests: ['Luxury Editorial', 'Architecture', 'Scuba in Maldives', 'Supercar Track Days'],
    favoriteDestinations: ['Dubai', 'St. Tropez', 'Ibiza (North Shore)', 'Capri'],
    idealDate: 'Sunset helicopter flight over Dubai coastline touching down at a secluded beach lounge for vintage Cristal and live jazz.',
    passions: ['Creative Direction', 'Fine Fragrance', 'Private Aviation'],
    luxuryPreferences: {
      champagne: 'Louis Roederer Cristal Rosé',
      watchOrJewelry: 'Van Cleef & Arpels Alhambra Vintage Malachite',
      preferredGetaway: 'Cheval Blanc Randheli, Maldives',
      fineDining: 'Zuma Dubai & L’Atelier de Joël Robuchon'
    },
    verified: true,
    activeStatus: 'Traveling in Monaco',
    instagramHandle: '@chloe.montmartre'
  },
  {
    id: 'f-5',
    name: 'Isabella Fontaine',
    age: 27,
    gender: 'female',
    headline: 'Contemporary Art Advisor & Sotheby’s Auctioneer',
    profession: 'Art Advisor & Gallery Director',
    companyOrAffiliation: 'Fontaine Fine Art & Basel Collector',
    education: 'Courtauld Institute of Art (London)',
    location: {
      city: 'Miami',
      country: 'USA',
      neighborhood: 'Brickell & Star Island'
    },
    bio: 'Curating private collections for ultra-high-net-worth families between Art Basel Miami, Frieze London, and Venice Biennale. Captivated by high drive, cultured humor, and effortless charisma.',
    quote: 'Art is the highest form of human hope.',
    height: "5'10\"",
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Art Basel VIP Board', type: 'philanthropist' },
      { label: 'Courtauld Honor', type: 'ivy_league' },
      { label: 'Black Tier Verified', type: 'black_card' }
    ],
    lifestyle: ['Art Basel Collector Days', 'Catamaran Sailing', 'Kite Surfing', 'Wine Auctions'],
    interests: ['Post-War & Contemporary Art', 'Speed Chess', 'Boutique Vineyard Scouting'],
    favoriteDestinations: ['Venice', 'Miami Beach', 'Mykonos', 'Gstaad'],
    idealDate: 'Private after-hours walkthrough of the Rubell Museum in Miami, followed by a seaside table at Casa Tua.',
    passions: ['Abstract Expressionism', 'Superyacht Chartering', 'Tennis'],
    luxuryPreferences: {
      champagne: 'Armand de Brignac Brut Gold',
      watchOrJewelry: 'Bulgari Serpenti Tubogas Gold',
      preferredGetaway: 'Aman Venice',
      fineDining: 'Casa Tua (Miami) & Le Bernardin (NYC)'
    },
    verified: true,
    activeStatus: 'Online',
    instagramHandle: '@isabella.artadvisory'
  },

  // --- MALE PROFILES ---
  {
    id: 'm-1',
    name: 'Alexander Sterling',
    age: 34,
    gender: 'male',
    headline: 'Managing Partner @ Global Macro Hedge Fund & Yachtsman',
    profession: 'Hedge Fund Partner & Investor',
    companyOrAffiliation: 'Sterling Global Capital ($1.8B AUM)',
    education: 'Wharton (Finance) & Oxford (PPE)',
    location: {
      city: 'London',
      country: 'UK',
      neighborhood: 'Mayfair / Knightsbridge'
    },
    netWorthBracket: '$85M+ Verified Liquid',
    bio: 'Macro hedge fund partner and competitive Rolex Fastnet regatta sailor. Relentless drive by day; connoisseur of quiet elegance, Michelin gastronomy, and classic literature by night.',
    quote: 'Success without character is simply an unfinished transaction.',
    height: "6'2\"",
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Verified Asset: $85M+', type: 'verified_asset' },
      { label: 'Wharton & Oxford', type: 'ivy_league' },
      { label: 'Founding Circle Member', type: 'black_card' }
    ],
    lifestyle: ['Private Falcon 8X', 'Rolex Middle Sea Race', 'Savile Row Bespoke', 'Rare Patek Collector'],
    interests: ['Global Macro Markets', 'Regatta Sailing', 'Helicopter Heli-Skiing', 'Classical Piano', 'Philosophy'],
    favoriteDestinations: ['Monaco', 'St. Moritz', 'Sardinia (Porto Cervo)', 'Amalfi Coast'],
    idealDate: 'A sunset boat transfer across the French Riviera to a cliffside dinner at Château de la Chèvre d’Or in Èze.',
    passions: ['Deep Sea Sailing', 'Venture Philanthropy', 'Rare Horology', 'Polo'],
    luxuryPreferences: {
      champagne: 'Dom Pérignon Reserve de l’Abbaye',
      watchOrJewelry: 'Patek Philippe Perpetual Calendar 5270P',
      preferredGetaway: 'Hotel du Cap-Eden-Roc, Antibes',
      fineDining: 'Core by Clare Smyth (London) & Le Gabriel (Paris)'
    },
    verified: true,
    activeStatus: 'Online',
    instagramHandle: '@sterling_alex'
  },
  {
    id: 'm-2',
    name: 'Julian Montgomery',
    age: 33,
    gender: 'male',
    headline: 'Tech Founder (Recent $120M Exit) & Angel Investor',
    profession: 'Venture Capitalist & Serial Founder',
    companyOrAffiliation: 'Apex Venture Partners / ex-Founder',
    education: 'Stanford University (BS / MS Computer Science)',
    location: {
      city: 'New York',
      country: 'USA',
      neighborhood: 'Tribeca / Hudson Yards'
    },
    netWorthBracket: '$140M+ Liquid Assets',
    bio: 'Built and scaled an enterprise AI infrastructure company from dorm room to acquisition. Now backing next-gen frontier tech, racing vintage Ferraris at Laguna Seca, and collecting minimalist architecture.',
    quote: 'Move with purpose, love with vulnerability, build with audacity.',
    height: "6'3\"",
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Forbes 30 Under 30 All-Star', type: 'forbes_30' },
      { label: 'Verified Asset: $100M+', type: 'verified_asset' },
      { label: 'Stanford Alum', type: 'ivy_league' }
    ],
    lifestyle: ['Vintage Car Concours (Villa d’Este)', 'Private Jet Share', 'Triathlons & Tennis', 'Modern Art Patron'],
    interests: ['AI Frontiers', 'Vintage Watch Auctions', 'Marathon Training', 'Sommelier Discoveries'],
    favoriteDestinations: ['Tokyo', 'Aspen', 'Kauai', 'Kyoto'],
    idealDate: 'Private omakase dinner prepared by a master sushi chef in a penthouse overlooking Manhattan skyline, followed by nightcaps on the terrace.',
    passions: ['Formula 1 Paddock', 'Deep Tech', 'Architectural Design'],
    luxuryPreferences: {
      champagne: 'Krug Clos du Mesnil 2008',
      watchOrJewelry: 'F.P. Journe Chronomètre Bleu',
      preferredGetaway: 'Aman Tokyo & Amangiri Utah',
      fineDining: 'Chef’s Table at Brooklyn Fare & Sukiyabashi Jiro'
    },
    verified: true,
    activeStatus: 'In New York',
    instagramHandle: '@j_montgomery'
  },
  {
    id: 'm-3',
    name: 'Massimo De Luca',
    age: 36,
    gender: 'male',
    headline: 'Real Estate Developer & Superyacht Builder',
    profession: 'Managing Director & Heir',
    companyOrAffiliation: 'De Luca Superyachts & Prime Estates',
    education: 'Bocconi University & Harvard Business School',
    location: {
      city: 'Monaco',
      country: 'Monaco',
      neighborhood: 'Monte Carlo'
    },
    netWorthBracket: '$220M+ Family & Personal Holdings',
    bio: 'Crafting 60m+ custom aluminium displacement yachts in Viareggio and developing prime coastal villas along the French and Italian Riviera. Passionate about equestrian polo, rare Barolo vintages, and high-stakes tennis.',
    quote: 'La vita è fatta per essere vissuta al massimo livello.',
    height: "6'1\"",
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Verified Asset: $200M+', type: 'verified_asset' },
      { label: 'Harvard MBA', type: 'ivy_league' },
      { label: 'Yacht Club de Monaco Board', type: 'black_card' }
    ],
    lifestyle: ['Superyacht Owner (52m Custom)', 'Monaco Grand Prix VIP Host', 'St. Tropez Polo Club'],
    interests: ['Marine Architecture', 'Vintage Supercars', 'Tuscan Viticulture', 'Polo Matches'],
    favoriteDestinations: ['Porto Cervo', 'Monaco', 'St. Moritz', 'Capri'],
    idealDate: 'Sunset cocktails aboard a 52-meter yacht anchored off Île Sainte-Marguerite in Cannes, with a Michelin private chef pairing seafood with vintage Dom Ruinart.',
    passions: ['Custom Yacht Engineering', 'Fine Italian Tailoring', 'Equestrian'],
    luxuryPreferences: {
      champagne: 'Dom Ruinart Blanc de Blancs',
      watchOrJewelry: 'Audemars Piguet Royal Oak Concept Flying Tourbillon',
      preferredGetaway: 'Grand Hotel a Villa Feltrinelli, Lake Garda',
      fineDining: 'Mirazur (Menton) & Osteria Francescana (Modena)'
    },
    verified: true,
    activeStatus: 'Traveling in Monaco',
    instagramHandle: '@massimo.deluca.mc'
  },
  {
    id: 'm-4',
    name: 'Dr. William St. Clair',
    age: 35,
    gender: 'male',
    headline: 'Biomedical Pioneer & Longevity Biotech Founder',
    profession: 'Chief Scientific Officer & Founder',
    companyOrAffiliation: 'St. Clair BioTherapeutics ($600M Cap)',
    education: 'Oxford (MBBS) & Johns Hopkins (PhD Genetics)',
    location: {
      city: 'Paris',
      country: 'France',
      neighborhood: '7th Arrondissement / Left Bank'
    },
    netWorthBracket: '$65M+ Equity & Liquid',
    bio: 'Pioneering cellular rejuvenation therapeutics and cellular longevity therapeutics. Classical cellist in free time, avid heliskier, and lifelong collector of 18th-century antique maps.',
    quote: 'Longevity is worthless without someone extraordinary to share every extra decade with.',
    height: "6'2\"",
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Oxford & Johns Hopkins PhD', type: 'ivy_league' },
      { label: 'Verified Asset: $65M+', type: 'verified_asset' },
      { label: 'Royal Society Fellow', type: 'philanthropist' }
    ],
    lifestyle: ['Alpine Heli-Skiing', 'Private Cellar Curation', 'Antique Map Auctions', 'Grand Opera Patron'],
    interests: ['Genomics & Longevity', 'Classical Cello', 'Bordeaux En Primeur', 'Deep Powder Skiing'],
    favoriteDestinations: ['Verbier', 'Kyoto', 'Highlands of Scotland', 'Paris'],
    idealDate: 'Private tour of the Paris Observatory library followed by an intimate candlelit dinner in a secluded private salon at Le Cinq.',
    passions: ['Cellular Regeneration', 'String Quartets', 'Mountaineering'],
    luxuryPreferences: {
      champagne: 'Taittinger Comtes de Champagne Blanc de Blancs',
      watchOrJewelry: 'A. Lange & Söhne Lange 1 Moonphase Platinum',
      preferredGetaway: 'The Chedi Andermatt, Switzerland',
      fineDining: 'Le Cinq (Paris) & Geranium (Copenhagen)'
    },
    verified: true,
    activeStatus: 'In Paris',
    instagramHandle: '@dr.william.stclair'
  }
];

export const INITIAL_EVENTS: LoungeEvent[] = [
  {
    id: 'ev-1',
    title: 'Monaco Grand Prix Superyacht Soirée',
    category: 'Yacht & Regatta',
    city: 'Monaco',
    venue: 'Port Hercules VIP Yacht Mooring (Section A)',
    date: 'Friday, May 22 • 8:00 PM',
    coverImage: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=85',
    description: 'An ultra-exclusive champagne reception aboard a 65-meter tri-deck superyacht overlooking the Monaco Grand Prix harbor circuit. Live DJ sets from Ibiza, caviar bar, and private tender transfers.',
    attendeesCount: 42,
    rsvpStatus: true,
    dressCode: 'Riviera Black Tie / Haute Resort Chic'
  },
  {
    id: 'ev-2',
    title: 'Art Basel Miami Private Collectors Preview & Gala',
    category: 'Private Art & Fashion',
    city: 'Miami',
    venue: 'Faena Forum & Private Oceanfront Pavilion',
    date: 'Thursday, Dec 3 • 7:30 PM',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    description: 'First-look private access to monumental installations, followed by a seated 5-course dinner for Aura Privé members and international museum patrons.',
    attendeesCount: 56,
    rsvpStatus: false,
    dressCode: 'Avant-Garde Formal / Cocktail Haute Couture'
  },
  {
    id: 'ev-3',
    title: 'St. Moritz Snow Polo World Cup Chalet Dinner',
    category: 'Polo & Equestrian',
    city: 'St. Moritz',
    venue: 'Badrutt’s Palace Private King’s Club',
    date: 'Saturday, Jan 24 • 9:00 PM',
    coverImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85',
    description: 'Celebrating the frozen lake Snow Polo championship with rare vintage champagne, truffle fondue degustation, and fireside salon music high in the Swiss Engadin Alps.',
    attendeesCount: 38,
    rsvpStatus: false,
    dressCode: 'Alpine Elegance & Cashmere Black Tie'
  },
  {
    id: 'ev-4',
    title: 'Cannes Film Festival Private Villa Afterparty',
    category: 'Gala & Soirée',
    city: 'Cannes',
    venue: 'Villa Saint-Tropez Vista, Cap d’Antibes',
    date: 'Wednesday, May 19 • 11:00 PM',
    coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85',
    description: 'Post-premiere private celebration with A-list directors, jury members, and global tastemakers overlooking the illuminated Mediterranean coastline.',
    attendeesCount: 65,
    rsvpStatus: false,
    dressCode: 'Red Carpet Black Tie'
  }
];

export const INITIAL_USER_PERSONAS: MemberProfile[] = [
  {
    id: 'user-male',
    name: 'Marcus Vance',
    age: 32,
    gender: 'male',
    headline: 'Managing Director @ Private Equity & Angel Investor',
    profession: 'Private Equity Managing Director',
    companyOrAffiliation: 'Vance Capital Partners ($1.2B Fund)',
    education: 'Princeton University (Econ) & Stanford GSB (MBA)',
    location: {
      city: 'New York',
      country: 'USA',
      neighborhood: 'Tribeca & Hudson Yards'
    },
    netWorthBracket: '$45M+ Verified Liquid Assets',
    bio: 'Managing tech & luxury brand buyouts between NYC, London, and Zurich. Looking for a brilliant, ambitious, and sophisticated woman who enjoys global adventures, fine wine, and deep intellectual connection.',
    quote: 'Build an empire, but never forget why you wanted the kingdom in the first place.',
    height: "6'2\"",
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Verified Asset: $45M+', type: 'verified_asset' },
      { label: 'Princeton & Stanford MBA', type: 'ivy_league' },
      { label: 'Black Tier Founding Member', type: 'black_card' }
    ],
    lifestyle: ['NetJets Fractional Member', 'Amalfi Coast Charters', 'Vintage Rolex & Patek', 'Tennis'],
    interests: ['Venture Capital', 'Architecture', 'Sailing', 'Philosophy', 'Art Auctions'],
    favoriteDestinations: ['St. Barths', 'Amalfi Coast', 'Tokyo', 'St. Moritz'],
    idealDate: 'Helicopter transfer from Manhattan to the Hamptons for seaside sunset cocktails, followed by dinner at Le Bernardin.',
    passions: ['Investing', 'Modern Architecture', 'Deep Sea Fishing'],
    luxuryPreferences: {
      champagne: 'Dom Pérignon P2',
      watchOrJewelry: 'Patek Philippe Nautilus 5711/1R',
      preferredGetaway: 'Cheval Blanc St-Barth Isle de France',
      fineDining: 'Le Bernardin (NYC) & The French Laundry'
    },
    verified: true,
    activeStatus: 'Online',
    instagramHandle: '@marcus.vance'
  },
  {
    id: 'user-female',
    name: 'Genevieve Laurent',
    age: 26,
    gender: 'female',
    headline: 'High Fashion Creative Director & Fine Arts Collector',
    profession: 'Creative Director & Brand Strategist',
    companyOrAffiliation: 'Maison Laurent Paris / Vogue Alum',
    education: 'Sciences Po & Parsons Paris',
    location: {
      city: 'Paris',
      country: 'France',
      neighborhood: '8th Arrondissement / Triangle d’Or'
    },
    bio: 'Directing luxury visual campaigns across Paris and Milan. Passionate about contemporary sculpture, rare vintage champagne, equestrian showjumping, and spontaneous getaways to Lake Como.',
    quote: 'True attraction is a dialogue of minds before it is anything else.',
    height: "5'10\"",
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85'
    ],
    badges: [
      { label: 'Black Tier VIP', type: 'black_card' },
      { label: 'Vogue & Harper’s Contributor', type: 'model_agency' },
      { label: 'Art Basel Young Patron', type: 'philanthropist' }
    ],
    lifestyle: ['Haute Couture Front Row', 'Private Jet Escapes', 'Equestrian Jumping', 'Wine Connoisseur'],
    interests: ['Fine Arts', 'Modernist Architecture', 'Opera', 'Polo', 'Yachting'],
    favoriteDestinations: ['Paris', 'Lake Como', 'St. Tropez', 'Kyoto'],
    idealDate: 'Private after-hours tour of the Musée Rodin sculpture gardens followed by candlelit dinner at Guy Savoy.',
    passions: ['Couture Styling', 'Sculpture', 'Alpine Skiing'],
    luxuryPreferences: {
      champagne: 'Krug Grande Cuvée 170th Edition',
      watchOrJewelry: 'Van Cleef & Arpels Alhambra & Cartier Tank Louis',
      preferredGetaway: 'Villa d’Este, Lake Como',
      fineDining: 'Plénitude by Arnaud Donckele (Paris)'
    },
    verified: true,
    activeStatus: 'Online',
    instagramHandle: '@genevieve.laurent'
  }
];
