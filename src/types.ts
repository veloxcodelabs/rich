export type Gender = 'male' | 'female';

export type MembershipTier = 'Black Tier VIP' | 'Gold Sovereign' | 'Founding Circle' | 'Platinum Elite';

export interface MemberProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  headline: string;
  profession: string;
  companyOrAffiliation: string;
  education: string;
  location: {
    city: string;
    country: string;
    neighborhood?: string;
  };
  netWorthBracket?: string; // e.g. '$10M - $25M Liquid', '$50M+ Verified'
  height?: string;
  bio: string;
  quote?: string;
  photos: string[];
  badges: {
    label: string;
    type: 'verified_asset' | 'forbes_30' | 'ivy_league' | 'model_agency' | 'founder' | 'philanthropist' | 'black_card';
    iconName?: string;
  }[];
  lifestyle: string[];
  interests: string[];
  favoriteDestinations: string[];
  idealDate: string;
  passions: string[];
  luxuryPreferences: {
    champagne?: string;
    watchOrJewelry?: string;
    preferredGetaway?: string;
    fineDining?: string;
  };
  verified: boolean;
  activeStatus: 'Online' | 'Active today' | 'Traveling in Monaco' | 'In St. Moritz' | 'In Paris' | 'In New York';
  instagramHandle?: string;
}

export interface MatchItem {
  id: string;
  member: MemberProfile;
  matchedAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isSuperLiked?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string; // 'me' or member.id
  text: string;
  timestamp: string;
  giftType?: 'champagne' | 'roses' | 'date_proposal';
  proposalDetails?: {
    venue: string;
    city: string;
    time: string;
  };
}

export interface LoungeEvent {
  id: string;
  title: string;
  category: 'Gala & Soirée' | 'Yacht & Regatta' | 'Private Art & Fashion' | 'Polo & Equestrian' | 'Chalet & Ski';
  city: string;
  venue: string;
  date: string;
  coverImage: string;
  description: string;
  attendeesCount: number;
  rsvpStatus: boolean;
  dressCode: string;
}

export interface CompatibilityReport {
  overallScore: number;
  verdict: string;
  pillars: {
    lifestyle: number;
    intellectual: number;
    travelChemistry: number;
    ambitionIndex: number;
    romanceVibe: number;
  };
  summary: string;
  sharedStrengths: string[];
  conversationStarters: string[];
  recommendedFirstDate: {
    venueType: string;
    vibe: string;
    suggestedActivity: string;
  };
}

export interface DateItinerary {
  city: string;
  theme: string;
  estimatedBudget: string;
  steps: {
    time: string;
    title: string;
    venueName: string;
    description: string;
    dressCode: string;
    insiderTip: string;
  }[];
}
