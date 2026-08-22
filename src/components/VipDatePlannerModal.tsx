import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  MapPin, 
  Clock, 
  Sparkles, 
  Send, 
  Wine, 
  Check, 
  Copy,
  DollarSign,
  Shirt,
  Lightbulb
} from 'lucide-react';
import { MemberProfile, DateItinerary } from '../types';

interface VipDatePlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetMember: MemberProfile | null;
  currentUserProfile: MemberProfile;
  onSendDateProposal?: (itinerary: DateItinerary, member: MemberProfile) => void;
}

const CITIES = ['Paris', 'London', 'New York', 'Monaco', 'Dubai', 'Miami', 'Tokyo', 'St. Moritz', 'Capri', 'Aspen'];
const THEMES = [
  'Michelin Gastronomy & Vintage Cuvée',
  'Private Superyacht & Riviera Sunset',
  'Exclusive Modern Art & Speakeasy Jazz',
  'Helicopter Heli-Skiing & Alpine Fondue',
  'Rooftop Skyline & High-Stakes Intrigue'
];

export const VipDatePlannerModal: React.FC<VipDatePlannerModalProps> = ({
  isOpen,
  onClose,
  targetMember,
  currentUserProfile,
  onSendDateProposal
}) => {
  const [selectedCity, setSelectedCity] = useState(targetMember?.location.city || 'Paris');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [itinerary, setItinerary] = useState<DateItinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [proposed, setProposed] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setProposed(false);
    try {
      const res = await fetch('/api/gemini/date-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: selectedCity,
          theme: selectedTheme,
          userProfile: currentUserProfile,
          targetMember: targetMember
        })
      });
      const data = await res.json();
      setItinerary(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyItinerary = () => {
    if (!itinerary) return;
    const text = `VIP DATE ITINERARY: ${itinerary.city} - ${itinerary.theme}\nEstimated Budget: ${itinerary.estimatedBudget}\n\n` +
      itinerary.steps.map((s) => `${s.time} - ${s.title} (${s.venueName})\n${s.description}\nDress Code: ${s.dressCode}\nTip: ${s.insiderTip}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendProposal = () => {
    if (itinerary && targetMember && onSendDateProposal) {
      onSendDateProposal(itinerary, targetMember);
      setProposed(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-xl border border-[#222222] bg-[#0d0d0d] shadow-2xl p-6 sm:p-8 overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#151515] text-[#888888] hover:text-white border border-[#333333] transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Title Header */}
        <div className="space-y-1 text-center pb-5 border-b border-[#222222]">
          <div className="inline-flex items-center space-x-2 rounded-sm border border-[#d4af37]/40 bg-[#151515] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <Flame className="h-3.5 w-3.5" />
            <span>VIP DATE ARCHITECT</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#ffffff] uppercase tracking-wider mt-1">
            {targetMember ? `Curate VIP Date with ${targetMember.name}` : 'Curate Bespoke Luxury Date Itinerary'}
          </h2>
          <p className="text-xs text-[#888888] max-w-lg mx-auto">
            AI-crafted three-phase rendezvous combining private transport, Michelin venues, and secret nightcaps.
          </p>
        </div>

        {/* Config Controls */}
        <div className="pt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* City Selection */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-[#d4af37] block mb-1.5">
                Select Destination City
              </label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3 py-2.5 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <MapPin className="h-3.5 w-3.5 text-[#d4af37] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-[#d4af37] block mb-1.5">
                Rendezvous Theme
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3 py-2.5 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex items-center space-x-2 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] px-6 py-2.5 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              <span>{loading ? 'Curating Bespoke Itinerary...' : itinerary ? 'Regenerate VIP Blueprint' : 'Generate VIP Date Blueprint'}</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 text-center space-y-3">
            <div className="inline-block h-7 w-7 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
            <p className="text-xs font-serif text-[#aaaaaa]">
              Coordinating reservations, sommelier pairings, and private salon access in {selectedCity}...
            </p>
          </div>
        )}

        {/* Generated Itinerary Display */}
        {itinerary && !loading && (
          <div className="mt-6 space-y-6 border-t border-[#222222] pt-6">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm border border-[#d4af37]/30 bg-[#151515] p-3.5">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] block">
                  Bespoke {itinerary.city} Experience
                </span>
                <p className="text-sm font-semibold text-[#ffffff] font-serif">{itinerary.theme}</p>
              </div>
              <div className="flex items-center space-x-1.5 rounded-sm bg-[#0a0a0a] border border-[#333333] px-2.5 py-1 text-xs text-[#d4af37] font-mono">
                <DollarSign className="h-3.5 w-3.5" />
                <span>{itinerary.estimatedBudget}</span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4">
              {itinerary.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative rounded-sm border border-[#222222] bg-[#111111] p-4 pl-5 space-y-2 hover:border-[#d4af37]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white font-bold text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-[#d4af37] font-mono">{step.time}</span>
                      <span className="text-[#ffffff] font-serif">• {step.title}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#888888] bg-[#0a0a0a] px-2 py-0.5 rounded-sm border border-[#222222]">
                      {step.venueName}
                    </span>
                  </div>

                  <p className="text-xs text-[#aaaaaa] leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="flex items-center space-x-1.5 text-[#888888]">
                      <Shirt className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                      <span><strong>Dress:</strong> {step.dressCode}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[#888888]">
                      <Lightbulb className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                      <span><strong>Insider Tip:</strong> {step.insiderTip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 border-t border-[#222222]">
              <button
                onClick={copyItinerary}
                className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rounded-sm border border-[#333333] bg-[#151515] px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#e0e0e0] hover:bg-[#222222] hover:text-[#d4af37] transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Itinerary Copied' : 'Copy Full Plan'}</span>
              </button>

              {targetMember && onSendDateProposal && (
                <button
                  onClick={handleSendProposal}
                  disabled={proposed}
                  className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] px-5 py-2.5 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{proposed ? 'Invitation Dispatched!' : `Send VIP Invitation to ${targetMember.name}`}</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
