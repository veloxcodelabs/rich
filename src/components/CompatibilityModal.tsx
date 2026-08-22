import React, { useEffect, useState } from 'react';
import { 
  X, 
  Sparkles, 
  Heart, 
  TrendingUp, 
  Compass, 
  Brain, 
  Flame, 
  Calendar, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Wine
} from 'lucide-react';
import { MemberProfile, CompatibilityReport } from '../types';

interface CompatibilityModalProps {
  member: MemberProfile | null;
  currentUserProfile: MemberProfile;
  onClose: () => void;
  onStartChat: (member: MemberProfile) => void;
  onPlanDate: (member: MemberProfile) => void;
}

export const CompatibilityModal: React.FC<CompatibilityModalProps> = ({
  member,
  currentUserProfile,
  onClose,
  onStartChat,
  onPlanDate
}) => {
  const [report, setReport] = useState<CompatibilityReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedStarter, setCopiedStarter] = useState<number | null>(null);

  useEffect(() => {
    if (!member) return;

    let isMounted = true;
    setLoading(true);

    fetch('/api/gemini/compatibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userProfile: currentUserProfile,
        targetMember: member
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setReport(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [member, currentUserProfile]);

  if (!member) return null;

  const copyStarter = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStarter(index);
    setTimeout(() => setCopiedStarter(null), 2000);
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

        {/* Header: Persona vs Member Portraits */}
        <div className="text-center space-y-3 pb-6 border-b border-[#222222]">
          <div className="inline-flex items-center space-x-2 rounded-sm border border-[#d4af37]/40 bg-[#151515] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI SYNCHRONICITY & CHEMISTRY MATRIX</span>
          </div>

          <div className="flex items-center justify-center space-x-4 sm:space-x-8 pt-2">
            {/* User */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={currentUserProfile.photos[0]}
                  alt={currentUserProfile.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-[#d4af37]"
                />
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0a] border border-[#d4af37] text-[10px]">
                  💎
                </span>
              </div>
              <p className="mt-1 text-xs font-bold font-serif text-[#ffffff]">{currentUserProfile.name}</p>
              <p className="text-[10px] text-[#888888]">{currentUserProfile.location.city}</p>
            </div>

            {/* Pulsing Sparkle in middle */}
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] shadow-lg shadow-[#d4af37]/20 animate-pulse">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white" />
              </div>
              <span className="text-[10px] font-bold text-[#d4af37] tracking-widest mt-1 uppercase">
                {loading ? 'Evaluating...' : `${report?.overallScore || 94}% MATCH`}
              </span>
            </div>

            {/* Target Member */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={member.photos[0]}
                  alt={member.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover ring-2 ring-[#d4af37]"
                />
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a0a0a] border border-[#d4af37] text-[10px]">
                  ✨
                </span>
              </div>
              <p className="mt-1 text-xs font-bold font-serif text-[#ffffff]">{member.name}</p>
              <p className="text-[10px] text-[#888888]">{member.location.city}</p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        {loading ? (
          <div className="py-16 text-center space-y-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
            <p className="text-sm font-serif text-[#aaaaaa]">
              Cross-analyzing lifestyle prestige, cultural values, and intellectual alignment...
            </p>
          </div>
        ) : report ? (
          <div className="space-y-6 pt-6">
            
            {/* Overall Verdict Banner */}
            <div className="rounded-sm border border-[#d4af37]/30 bg-[#111111] p-4 text-center">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] block">
                Executive Chemistry Verdict
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#ffffff] mt-0.5">
                "{report.verdict}"
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#aaaaaa] leading-relaxed max-w-2xl mx-auto">
                {report.summary}
              </p>
            </div>

            {/* 5 Pillar Score Meters */}
            <div>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] block mb-3">
                Prestige & Chemistry Pillars
              </span>
              <div className="space-y-2.5">
                {[
                  { label: 'Lifestyle & Sophistication', score: report.pillars.lifestyle, icon: Wine },
                  { label: 'Intellectual & Career Parity', score: report.pillars.intellectual, icon: Brain },
                  { label: 'Global Travel & Escape Synergy', score: report.pillars.travelChemistry, icon: Compass },
                  { label: 'Ambition & Vision Alignment', score: report.pillars.ambitionIndex, icon: TrendingUp },
                  { label: 'Romantic & Flirtatious Chemistry', score: report.pillars.romanceVibe, icon: Flame }
                ].map((pillar, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-[#e0e0e0] font-medium">
                        <pillar.icon className="h-3.5 w-3.5 text-[#d4af37]" />
                        <span className="text-[11px] uppercase tracking-wider">{pillar.label}</span>
                      </div>
                      <span className="font-bold text-[#d4af37] font-mono">{pillar.score}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#151515] overflow-hidden border border-[#222222]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#8e6e3d] via-[#c5a059] to-[#d4af37] transition-all duration-700"
                        style={{ width: `${pillar.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shared Strengths */}
            <div className="rounded-sm border border-[#222222] bg-[#111111] p-4 space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] block">
                Harmonious Dynamics
              </span>
              <ul className="space-y-1.5">
                {report.sharedStrengths?.map((st, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-[#aaaaaa]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curated First Date Concept */}
            {report.recommendedFirstDate && (
              <div className="rounded-sm border border-[#d4af37]/30 bg-[#151515] p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">
                    AI Curated First Date Blueprint
                  </span>
                  <span className="text-[10px] text-[#888888] font-medium uppercase tracking-wider">{report.recommendedFirstDate.vibe}</span>
                </div>
                <p className="text-xs font-semibold text-[#ffffff] font-serif">
                  {report.recommendedFirstDate.venueType}
                </p>
                <p className="text-xs text-[#aaaaaa] italic">
                  "{report.recommendedFirstDate.suggestedActivity}"
                </p>
              </div>
            )}

            {/* Bespoke Conversation Starters */}
            {report.conversationStarters?.length > 0 && (
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#d4af37] block">
                  Tailored Icebreakers
                </span>
                <div className="space-y-1.5">
                  {report.conversationStarters.map((starter, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-sm border border-[#222222] bg-[#0a0a0a] p-2.5 text-xs text-[#aaaaaa]"
                    >
                      <p className="flex-1 mr-2 text-[#e0e0e0]">{starter}</p>
                      <button
                        onClick={() => copyStarter(starter, idx)}
                        className="p-1 text-[#888888] hover:text-[#d4af37] transition-colors shrink-0"
                        title="Copy to clipboard"
                      >
                        {copiedStarter === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-[#222222]">
              <button
                onClick={() => {
                  onClose();
                  onPlanDate(member);
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rounded-sm border border-[#333333] bg-[#151515] px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#e0e0e0] hover:bg-[#222222] hover:text-[#d4af37] transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Curate Full Date Itinerary</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onStartChat(member);
                }}
                className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] px-5 py-2.5 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md"
              >
                <span>Initiate Private Dialogue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        ) : null}

      </div>
    </div>
  );
};
