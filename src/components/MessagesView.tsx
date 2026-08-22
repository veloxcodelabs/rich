import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Wine, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  CheckCheck, 
  Gift, 
  Calendar,
  User,
  Heart,
  Bot,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MatchItem, ChatMessage, MemberProfile, DateItinerary } from '../types';

interface MessagesViewProps {
  matches: MatchItem[];
  currentMatch: MatchItem | null;
  onSelectMatch: (match: MatchItem) => void;
  currentUserProfile: MemberProfile;
  onOpenDatePlannerForMember: (member: MemberProfile) => void;
  onOpenProfileDetail: (member: MemberProfile) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  matches,
  currentMatch,
  onSelectMatch,
  currentUserProfile,
  onOpenDatePlannerForMember,
  onOpenProfileDetail
}) => {
  // Store chat history per match ID
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({
    'f-1': [
      {
        id: 'msg-1',
        senderId: 'f-1',
        text: `Bonjour ${currentUserProfile.name}. Sebastian mentioned we both share a passion for vintage champagne and Place Vendôme jewelry design. Delighted to connect with you.`,
        timestamp: '10:14 AM'
      }
    ],
    'm-1': [
      {
        id: 'msg-2',
        senderId: 'm-1',
        text: `Good day ${currentUserProfile.name}. I noticed your impeccable taste in architecture and travel. Are you currently in London or traveling through Monaco this season?`,
        timestamp: 'Yesterday'
      }
    ]
  });

  const [inputText, setInputText] = useState('');
  const [loadingReply, setLoadingReply] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = currentMatch ? chatHistories[currentMatch.member.id] || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages, loadingReply]);

  const handleSendMessage = async (textToSend: string, giftType?: 'champagne' | 'roses' | 'date_proposal', proposalDetails?: any) => {
    if (!currentMatch || (!textToSend.trim() && !giftType)) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      giftType,
      proposalDetails
    };

    const updatedHistory = [...activeMessages, newMsg];
    setChatHistories((prev) => ({
      ...prev,
      [currentMatch.member.id]: updatedHistory
    }));
    setInputText('');
    setAiSuggestions([]);
    setShowGiftMenu(false);

    if (giftType === 'champagne' || giftType === 'roses') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: giftType === 'champagne' ? ['#f59e0b', '#fbbf24', '#ffffff'] : ['#f43f5e', '#fb7185', '#e11d48']
      });
    }

    // Call Gemini to generate dynamic in-character reply from target persona
    setLoadingReply(true);
    try {
      const res = await fetch('/api/gemini/persona-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetMember: currentMatch.member,
          userProfile: currentUserProfile,
          messageHistory: updatedHistory,
          latestUserMessage: textToSend || `Sent a VIP gift: ${giftType}`
        })
      });
      const data = await res.json();
      
      setTimeout(() => {
        const partnerReply: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderId: currentMatch.member.id,
          text: data.reply || 'That sounds wonderful! Let us coordinate with the concierge soon.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatHistories((prev) => ({
          ...prev,
          [currentMatch.member.id]: [...(prev[currentMatch.member.id] || []), partnerReply]
        }));
        setLoadingReply(false);
      }, 1200);

    } catch (e) {
      console.error(e);
      setLoadingReply(false);
    }
  };

  const handleGenerateWingmanReplies = async () => {
    if (!currentMatch) return;
    setLoadingSuggestions(true);
    try {
      const res = await fetch('/api/gemini/icebreaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: currentUserProfile,
          targetMember: currentMatch.member
        })
      });
      const data = await res.json();
      if (data.icebreakers) {
        setAiSuggestions(data.icebreakers.map((b: any) => b.text));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
      <div className="rounded-xl border border-[#222222] bg-[#0d0d0d] flex flex-col md:flex-row h-[650px] shadow-2xl overflow-hidden">
        
        {/* Left: Matches List */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-[#222222] flex flex-col bg-[#0a0a0a]">
          <div className="p-4 border-b border-[#222222] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-sm font-bold text-[#ffffff] uppercase tracking-wider">
                VIP Connections
              </span>
              <span className="rounded-sm bg-[#151515] border border-[#333333] px-2 py-0.5 text-[9px] font-bold text-[#d4af37]">
                {matches.length}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#666666]">Encrypted</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#1a1a1a]">
            {matches.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Heart className="h-8 w-8 text-[#444444] mx-auto" />
                <p className="text-xs text-[#888888]">
                  No active connections yet. Explore the Curated Feed or send a Vintage Champagne toast!
                </p>
              </div>
            ) : (
              matches.map((item) => {
                const isSelected = currentMatch?.member.id === item.member.id;
                const lastMsg = (chatHistories[item.member.id] || []).slice(-1)[0]?.text || item.lastMessage || 'Connected on Aura Privé';
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectMatch(item)}
                    className={`flex w-full items-center space-x-3 p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-[#151515] border-l-2 border-[#d4af37]'
                        : 'hover:bg-[#111111]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={item.member.photos[0]}
                        alt={item.member.name}
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-[#333333]"
                      />
                      {item.isSuperLiked && (
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-[8px] text-black font-bold" title="Super-Liked">
                          🍾
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold text-[#e0e0e0] text-xs sm:text-sm truncate">
                            {item.member.name}
                          </span>
                          <ShieldCheck className="h-3 w-3 text-[#d4af37] shrink-0" />
                        </div>
                        <span className="text-[10px] text-[#666666]">{item.member.location.city}</span>
                      </div>
                      <p className="text-[11px] text-[#888888] truncate mt-0.5">{lastMsg}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        {currentMatch ? (
          <div className="flex-1 flex flex-col bg-[#0e0e0e]">
            
            {/* Chat Header */}
            <div className="p-3.5 border-b border-[#222222] flex items-center justify-between bg-[#111111]">
              <div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => onOpenProfileDetail(currentMatch.member)}
              >
                <img
                  src={currentMatch.member.photos[0]}
                  alt={currentMatch.member.name}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-[#d4af37]"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif text-sm font-bold text-[#ffffff] hover:text-[#d4af37]">
                      {currentMatch.member.name}, {currentMatch.member.age}
                    </span>
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" />
                  </div>
                  <p className="text-[11px] text-[#888888]">
                    {currentMatch.member.headline}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenDatePlannerForMember(currentMatch.member)}
                  className="flex items-center space-x-1.5 rounded-sm border border-[#d4af37] bg-[#0a0a0a] px-3 py-1.5 text-xs uppercase tracking-widest font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  <Flame className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span className="hidden sm:inline">Propose VIP Date</span>
                </button>
              </div>
            </div>

            {/* Messages Scroll View */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              
              {/* Privacy / Encryption Notice */}
              <div className="text-center py-2">
                <span className="inline-block rounded-sm bg-[#151515] border border-[#222222] px-3 py-1 text-[10px] uppercase tracking-wider text-[#666666]">
                  🔒 Private & Confidential Dialogue • Aura Privé Concierge Monitored
                </span>
              </div>

              {activeMessages.map((msg) => {
                const isMe = msg.senderId === 'me';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-2.5 ${
                      isMe ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {!isMe ? (
                      <img
                        src={currentMatch.member.photos[0]}
                        alt={currentMatch.member.name}
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-[#333333]"
                      />
                    ) : (
                      <img
                        src={currentUserProfile.photos[0]}
                        alt={currentUserProfile.name}
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-[#d4af37]"
                      />
                    )}

                    <div
                      className={`max-w-[75%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white font-medium rounded-tr-none shadow-md'
                          : 'bg-[#151515] border border-[#222222] text-[#e0e0e0] rounded-tl-none'
                      }`}
                    >
                      {/* Special Gift or Proposal Card in Message */}
                      {msg.giftType === 'champagne' && (
                        <div className="mb-2 rounded-sm bg-[#0a0a0a] border border-[#d4af37]/40 p-2.5 text-[#d4af37] flex items-center space-x-2 text-xs">
                          <Wine className="h-5 w-5 text-[#d4af37] shrink-0" />
                          <div>
                            <span className="font-bold block uppercase tracking-wider text-[11px]">Vintage Dom Pérignon P2</span>
                            <span className="text-[10px] text-[#888888]">Presented with private caviar pairing</span>
                          </div>
                        </div>
                      )}

                      {msg.giftType === 'roses' && (
                        <div className="mb-2 rounded-sm bg-[#0a0a0a] border border-rose-500/40 p-2.5 text-rose-300 flex items-center space-x-2 text-xs">
                          <span className="text-base">🌹</span>
                          <div>
                            <span className="font-bold block uppercase tracking-wider text-[11px]">100 Ecuadorian Long-Stem Velvet Roses</span>
                            <span className="text-[10px] text-[#888888]">Hand-delivered with personalized note</span>
                          </div>
                        </div>
                      )}

                      {msg.giftType === 'date_proposal' && msg.proposalDetails && (
                        <div className="mb-2 rounded-sm bg-[#0a0a0a] border border-[#d4af37]/60 p-3 text-[#e0e0e0] space-y-1 text-xs">
                          <div className="flex items-center space-x-1 text-[#d4af37] font-bold uppercase tracking-wider text-[11px]">
                            <Flame className="h-4 w-4" />
                            <span>VIP Date Proposal in {msg.proposalDetails.city}</span>
                          </div>
                          <p className="font-semibold text-white">{msg.proposalDetails.venue}</p>
                          <p className="text-[10px] text-[#888888]">Arranged through Aura Privé Private Concierge</p>
                        </div>
                      )}

                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1 text-[9px] text-[#888888]">
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loadingReply && (
                <div className="flex items-center space-x-2 text-xs text-[#888888] pl-9">
                  <div className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
                  <span className="italic">{currentMatch.member.name} is composing a reply...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* AI Wingman Suggestion Chips */}
            {aiSuggestions.length > 0 && (
              <div className="px-4 py-2 bg-[#111111] border-t border-[#222222] space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] block">
                  AI Wingman Smart Suggestions
                </span>
                <div className="flex flex-col space-y-1">
                  {aiSuggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug)}
                      className="text-left text-xs text-[#aaaaaa] hover:text-[#d4af37] hover:bg-[#151515] p-1.5 rounded-sm transition-colors truncate"
                    >
                      💡 {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Menu Overlay */}
            {showGiftMenu && (
              <div className="px-4 py-3 bg-[#111111] border-t border-[#222222] flex items-center space-x-3">
                <button
                  onClick={() => handleSendMessage(`I would love to send a bottle of vintage Dom Pérignon to your table.`, 'champagne')}
                  className="flex items-center space-x-1.5 rounded-sm border border-[#d4af37]/60 bg-[#0a0a0a] px-3 py-2 text-xs font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  <Wine className="h-4 w-4 text-[#d4af37]" />
                  <span>Send Dom Pérignon ($550)</span>
                </button>

                <button
                  onClick={() => handleSendMessage(`Sending you 100 Ecuadorian roses with my warmest compliments.`, 'roses')}
                  className="flex items-center space-x-1.5 rounded-sm border border-rose-500/40 bg-[#0a0a0a] px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/10 transition-all"
                >
                  <span>🌹</span>
                  <span>100 Long-Stem Roses</span>
                </button>
              </div>
            )}

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 border-t border-[#222222] bg-[#0a0a0a]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }}
                className="flex items-center space-x-2"
              >
                {/* Gift Button */}
                <button
                  type="button"
                  onClick={() => setShowGiftMenu(!showGiftMenu)}
                  className="p-2.5 rounded-sm border border-[#333333] bg-[#151515] text-[#d4af37] hover:bg-[#222222] transition-colors"
                  title="Send Luxury Gift"
                >
                  <Gift className="h-4 w-4" />
                </button>

                {/* AI Wingman Trigger */}
                <button
                  type="button"
                  onClick={handleGenerateWingmanReplies}
                  disabled={loadingSuggestions}
                  className="p-2.5 rounded-sm border border-[#333333] bg-[#151515] text-[#aaaaaa] hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors disabled:opacity-50"
                  title="AI Wingman Suggestions"
                >
                  <Sparkles className="h-4 w-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write to ${currentMatch.member.name}...`}
                  className="flex-1 rounded-sm border border-[#333333] bg-[#151515] px-4 py-2.5 text-xs sm:text-sm text-[#e0e0e0] placeholder-[#666666] focus:border-[#d4af37] focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white hover:brightness-110 transition-all disabled:opacity-40 shadow-md shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 bg-[#0a0a0a]">
            <Wine className="h-10 w-10 text-[#d4af37]/40" />
            <h3 className="font-serif text-lg font-bold text-[#e0e0e0] uppercase tracking-wider">
              Select a Connection
            </h3>
            <p className="text-xs text-[#888888] max-w-sm">
              Initiate a confidential dialogue or send a vintage champagne toast to your matches.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
