import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Wine, 
  Check, 
  RefreshCw,
  UserCheck,
  Lock,
  LogIn
} from 'lucide-react';
import { MemberProfile } from '../types';

interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona: MemberProfile;
  onUpdateProfile: (updated: MemberProfile) => void;
  personas: MemberProfile[];
  onSwitchPersona: (persona: MemberProfile) => void;
  isLoggedIn?: boolean;
  onOpenLogin?: () => void;
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
  isOpen,
  onClose,
  currentPersona,
  onUpdateProfile,
  personas,
  onSwitchPersona,
  isLoggedIn = true,
  onOpenLogin
}) => {
  const [headline, setHeadline] = useState(currentPersona.headline);
  const [bio, setBio] = useState(currentPersona.bio);
  const [idealDate, setIdealDate] = useState(currentPersona.idealDate);
  const [loadingPolish, setLoadingPolish] = useState(false);
  const [polishResult, setPolishResult] = useState<{
    polishedHeadline: string;
    polishedBio: string;
    luxuryRating: string;
    curatorTips: string[];
  } | null>(null);

  // Sync state if currentPersona changes
  React.useEffect(() => {
    setHeadline(currentPersona.headline);
    setBio(currentPersona.bio);
    setIdealDate(currentPersona.idealDate);
  }, [currentPersona]);

  if (!isOpen) return null;

  const handlePolish = async () => {
    if (!isLoggedIn) {
      if (onOpenLogin) onOpenLogin();
      return;
    }
    setLoadingPolish(true);
    try {
      const res = await fetch('/api/gemini/profile-polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentProfile: {
            ...currentPersona,
            headline,
            bio,
            idealDate
          }
        })
      });
      const data = await res.json();
      setPolishResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPolish(false);
    }
  };

  const applyPolish = () => {
    if (!isLoggedIn) {
      if (onOpenLogin) onOpenLogin();
      return;
    }
    if (polishResult) {
      setHeadline(polishResult.polishedHeadline);
      setBio(polishResult.polishedBio);
      const updated: MemberProfile = {
        ...currentPersona,
        headline: polishResult.polishedHeadline,
        bio: polishResult.polishedBio
      };
      onUpdateProfile(updated);
      setPolishResult(null);
    }
  };

  const handleSave = () => {
    if (!isLoggedIn) {
      if (onOpenLogin) onOpenLogin();
      return;
    }
    const updated: MemberProfile = {
      ...currentPersona,
      headline,
      bio,
      idealDate
    };
    onUpdateProfile(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl border border-[#222222] bg-[#0d0d0d] shadow-2xl p-6 sm:p-8 overflow-hidden my-auto max-h-[92vh] overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#151515] text-[#888888] hover:text-white border border-[#333333] transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Black Card Membership Header */}
        <div className="relative rounded-xl border border-[#d4af37]/40 bg-[#111111] p-5 sm:p-6 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Crown className="h-28 w-28 text-[#d4af37]" />
          </div>

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={currentPersona.photos[0]}
                alt={currentPersona.name}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[#d4af37] shadow-lg"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-serif text-xl font-bold text-[#ffffff] uppercase tracking-wider">
                    {currentPersona.name}
                  </h2>
                  <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                </div>
                <p className="text-xs text-[#d4af37] font-mono tracking-wider">
                  MEMBER ID: #AP-8849-BK
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-[#888888] mt-1">
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-[#d4af37]" />
                    <span>{currentPersona.location.city}</span>
                  </span>
                  <span>•</span>
                  <span>{currentPersona.profession}</span>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-[#d4af37]/40 bg-[#0a0a0a] px-3 py-1.5 text-center">
              <span className="text-[9px] uppercase font-bold text-[#d4af37] tracking-widest block">
                MEMBERSHIP TIER
              </span>
              <span className="font-serif text-xs font-bold text-[#ffffff] uppercase tracking-wider">
                BLACK TIER FOUNDING
              </span>
            </div>
          </div>
        </div>

        {/* Guest Lock Notice when not logged in */}
        {!isLoggedIn && (
          <div className="rounded-sm border border-[#d4af37]/40 bg-[#151515] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-full bg-[#0a0a0a] border border-[#d4af37]/50 flex items-center justify-center shrink-0">
                <Lock className="h-4 w-4 text-[#d4af37]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Guest Preview — Member Profile Locked</p>
                <p className="text-[11px] text-[#888888]">Please log in or apply for membership to edit details, update statements, or run AI polish.</p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onOpenLogin) onOpenLogin();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white text-xs uppercase tracking-wider font-bold hover:brightness-110 shrink-0 shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Log In to Edit</span>
            </button>
          </div>
        )}

        {/* Verification Audit Checklist */}
        <div className="rounded-sm border border-[#222222] bg-[#111111] p-4 space-y-2.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37] block">
            Aura Privé Verified Credentials Audit
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center space-x-2 rounded-sm bg-[#0a0a0a] p-2 border border-[#222222]">
              <Check className="h-4 w-4 text-[#d4af37] shrink-0" />
              <span className="text-[#e0e0e0] text-[11px]">Biometric Face Audit</span>
            </div>
            <div className="flex items-center space-x-2 rounded-sm bg-[#0a0a0a] p-2 border border-[#222222]">
              <Check className="h-4 w-4 text-[#d4af37] shrink-0" />
              <span className="text-[#e0e0e0] text-[11px]">Asset & Career Verification</span>
            </div>
            <div className="flex items-center space-x-2 rounded-sm bg-[#0a0a0a] p-2 border border-[#222222]">
              <Check className="h-4 w-4 text-[#d4af37] shrink-0" />
              <span className="text-[#e0e0e0] text-[11px]">Club Vetting Approved</span>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888888]">
                Headline
              </label>
              {!isLoggedIn && (
                <span className="flex items-center space-x-1 text-[10px] text-[#666666] font-mono">
                  <Lock className="h-2.5 w-2.5" />
                  <span>LOCKED</span>
                </span>
              )}
            </div>
            <input
              type="text"
              disabled={!isLoggedIn}
              readOnly={!isLoggedIn}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className={`w-full rounded-sm border px-3.5 py-2.5 text-xs sm:text-sm transition-all focus:outline-none ${
                !isLoggedIn 
                  ? 'border-[#222222] bg-[#0a0a0a] text-[#777777] cursor-not-allowed select-none' 
                  : 'border-[#333333] bg-[#151515] text-[#e0e0e0] focus:border-[#d4af37]'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888888]">
                Bio & Lifestyle Statement
              </label>
              {!isLoggedIn && (
                <span className="flex items-center space-x-1 text-[10px] text-[#666666] font-mono">
                  <Lock className="h-2.5 w-2.5" />
                  <span>LOCKED</span>
                </span>
              )}
            </div>
            <textarea
              rows={3}
              disabled={!isLoggedIn}
              readOnly={!isLoggedIn}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full rounded-sm border px-3.5 py-2.5 text-xs sm:text-sm transition-all focus:outline-none ${
                !isLoggedIn 
                  ? 'border-[#222222] bg-[#0a0a0a] text-[#777777] cursor-not-allowed select-none' 
                  : 'border-[#333333] bg-[#151515] text-[#e0e0e0] focus:border-[#d4af37]'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#888888]">
                Ideal First Date Description
              </label>
              {!isLoggedIn && (
                <span className="flex items-center space-x-1 text-[10px] text-[#666666] font-mono">
                  <Lock className="h-2.5 w-2.5" />
                  <span>LOCKED</span>
                </span>
              )}
            </div>
            <input
              type="text"
              disabled={!isLoggedIn}
              readOnly={!isLoggedIn}
              value={idealDate}
              onChange={(e) => setIdealDate(e.target.value)}
              className={`w-full rounded-sm border px-3.5 py-2.5 text-xs sm:text-sm transition-all focus:outline-none ${
                !isLoggedIn 
                  ? 'border-[#222222] bg-[#0a0a0a] text-[#777777] cursor-not-allowed select-none' 
                  : 'border-[#333333] bg-[#151515] text-[#e0e0e0] focus:border-[#d4af37]'
              }`}
            />
          </div>
        </div>

        {/* AI Profile Polish Button & Output */}
        <div className="rounded-sm border border-[#222222] bg-[#111111] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#e0e0e0]">AI Profile Polish & Executive Copywriter</span>
            </div>
            <button
              onClick={handlePolish}
              disabled={loadingPolish}
              className="flex items-center space-x-1.5 rounded-sm bg-[#0a0a0a] border border-[#d4af37]/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all disabled:opacity-50"
            >
              {!isLoggedIn && <Lock className="h-3 w-3" />}
              <span>{loadingPolish ? 'Analyzing...' : !isLoggedIn ? 'Log In to Polish' : 'Elevate My Profile'}</span>
            </button>
          </div>

          {polishResult && (
            <div className="space-y-3 pt-2 text-xs border-t border-[#222222]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">Curator Caliber Score</span>
                <span className="font-bold text-emerald-400">{polishResult.luxuryRating}</span>
              </div>

              <div className="space-y-1 bg-[#0a0a0a] p-2.5 rounded-sm border border-[#222222]">
                <span className="text-[10px] text-[#888888] block uppercase tracking-wider">Suggested Magnetic Headline:</span>
                <p className="font-semibold text-[#ffffff]">{polishResult.polishedHeadline}</p>
              </div>

              <div className="space-y-1 bg-[#0a0a0a] p-2.5 rounded-sm border border-[#222222]">
                <span className="text-[10px] text-[#888888] block uppercase tracking-wider">Suggested Refined Bio:</span>
                <p className="text-[#aaaaaa] leading-relaxed">{polishResult.polishedBio}</p>
              </div>

              <ul className="space-y-1 text-[#888888] text-[11px]">
                {polishResult.curatorTips?.map((tip, idx) => (
                  <li key={idx}>✨ {tip}</li>
                ))}
              </ul>

              <button
                onClick={applyPolish}
                className="w-full rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] py-2 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-colors"
              >
                Apply AI Suggestions to Profile
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#222222]">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#888888]">Switch Persona:</span>
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSwitchPersona(p);
                  setHeadline(p.headline);
                  setBio(p.bio);
                  setIdealDate(p.idealDate);
                }}
                className={`px-2.5 py-1 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors ${
                  p.id === currentPersona.id
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-[#151515] border border-[#333333] text-[#aaaaaa] hover:bg-[#222222] hover:text-[#d4af37]'
                }`}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] px-5 py-2 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 shadow-md w-full sm:w-auto justify-center"
          >
            {!isLoggedIn && <Lock className="h-3.5 w-3.5" />}
            <span>{!isLoggedIn ? 'Log In to Edit Profile' : 'Save Changes'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
