import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Crown, 
  Wine, 
  MapPin, 
  Flame, 
  UserCheck, 
  ShieldCheck,
  Bot,
  User,
  RefreshCw,
  Award
} from 'lucide-react';
import { MemberProfile } from '../types';

interface AiConciergeProps {
  currentUserProfile: MemberProfile;
  allMembers: MemberProfile[];
  onSelectMember: (member: MemberProfile) => void;
  onOpenDatePlanner: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AiConcierge: React.FC<AiConciergeProps> = ({
  currentUserProfile,
  allMembers,
  onSelectMember,
  onOpenDatePlanner
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Good evening, ${currentUserProfile.name}. I am Sebastian Vance, your Private Matchmaking Concierge at Aura Privé. I have reviewed our global roster of accomplished gentlemen and hot women across London, Paris, Monaco, New York, and Dubai. How may I assist your romantic pursuits this evening?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages,
          userProfile: currentUserProfile,
          activeMembers: allMembers.map(m => ({
            name: m.name,
            age: m.age,
            city: m.location.city,
            headline: m.headline,
            netWorth: m.netWorthBracket,
            passions: m.passions
          }))
        })
      });

      const data = await res.json();
      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply || 'I am coordinating with our membership committee for further details.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'My apologies, there was a momentary disruption in the salon. Please ask your question once more.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const PROMPT_CHIPS = [
    'Who is my most compatible match in Paris or London?',
    'Plan an unforgettable private date in Monaco for this weekend',
    'How can I refine my profile to attract ultra-high-caliber individuals?',
    'Suggest a charming, witty opening icebreaker for Elena Rostova',
    'Recommend exclusive events during Art Basel or Cannes Film Festival'
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8">
      
      {/* Header Banner */}
      <div className="mb-6 rounded-sm border border-[#222222] bg-[#111111] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] shadow-lg shadow-black/50 text-white">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-xl font-bold text-[#ffffff] uppercase tracking-wider">
                  Sebastian Vance | Senior Private Concierge
                </h2>
                <span className="flex items-center space-x-1 rounded-sm bg-[#151515] px-2 py-0.5 text-[9px] font-bold text-[#d4af37] border border-[#333333] uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" />
                  <span>AI MATCHMAKER</span>
                </span>
              </div>
              <p className="text-xs text-[#888888] mt-0.5">
                Bespoke matchmaking intelligence, high-society etiquette, and private VIP date curation.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDatePlanner}
            className="flex items-center space-x-2 rounded-sm border border-[#d4af37] bg-[#0a0a0a] px-4 py-2 text-xs uppercase tracking-widest text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all shadow-md font-semibold"
          >
            <Flame className="h-4 w-4" />
            <span>Launch VIP Date Planner</span>
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-xl border border-[#222222] bg-[#0d0d0d] flex flex-col h-[580px] shadow-2xl overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className="shrink-0">
                {msg.role === 'assistant' ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white shadow-md">
                    <Crown className="h-4 w-4" />
                  </div>
                ) : (
                  <img
                    src={currentUserProfile.photos[0]}
                    alt={currentUserProfile.name}
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-[#d4af37]"
                  />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] sm:max-w-[70%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white font-medium rounded-tr-none shadow-md'
                    : 'bg-[#151515] border border-[#222222] text-[#e0e0e0] rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <span
                  className={`text-[10px] block mt-1 ${
                    msg.role === 'user' ? 'text-white/70 text-right' : 'text-[#666666]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white">
                <Crown className="h-4 w-4" />
              </div>
              <div className="rounded-xl rounded-tl-none bg-[#151515] border border-[#222222] p-3.5 text-xs text-[#aaaaaa] flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
                <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse delay-150" />
                <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse delay-300" />
                <span className="font-serif text-[#d4af37] text-xs ml-1">Sebastian is consulting the club archives...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Chips */}
        <div className="px-4 py-2 bg-[#111111] border-t border-[#222222] overflow-x-auto flex space-x-2 no-scrollbar">
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              disabled={loading}
              className="rounded-sm border border-[#333333] bg-[#151515] px-3 py-1.5 text-[11px] text-[#aaaaaa] hover:border-[#d4af37] hover:text-[#d4af37] whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0a0a0a] border-t border-[#222222]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inquire about matchmaking, bespoke dates, etiquette, or specific members..."
              className="flex-1 rounded-sm border border-[#333333] bg-[#151515] px-4 py-2.5 text-xs sm:text-sm text-[#e0e0e0] placeholder-[#666666] focus:border-[#d4af37] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white hover:brightness-110 transition-all disabled:opacity-40 shadow-md shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
