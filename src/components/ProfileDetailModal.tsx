import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Sparkles, 
  Wine, 
  Plane, 
  Watch, 
  Award, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  CheckCircle2,
  Send,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { MemberProfile } from '../types';

interface ProfileDetailModalProps {
  member: MemberProfile | null;
  onClose: () => void;
  onLike: (member: MemberProfile) => void;
  onSuperLike: (member: MemberProfile) => void;
  onOpenCompatibility: (member: MemberProfile) => void;
  onOpenDatePlannerForMember: (member: MemberProfile) => void;
  currentUserProfile: MemberProfile;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  member,
  onClose,
  onLike,
  onSuperLike,
  onOpenCompatibility,
  onOpenDatePlannerForMember,
  currentUserProfile
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [icebreakers, setIcebreakers] = useState<{ type: string; text: string }[]>([]);
  const [loadingIcebreakers, setLoadingIcebreakers] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!member) return null;

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % member.photos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + member.photos.length) % member.photos.length);
  };

  const generateIcebreakers = async () => {
    setLoadingIcebreakers(true);
    try {
      const res = await fetch('/api/gemini/icebreaker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: currentUserProfile,
          targetMember: member
        })
      });
      const data = await res.json();
      if (data.icebreakers) {
        setIcebreakers(data.icebreakers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingIcebreakers(false);
    }
  };

  const copyIcebreaker = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-xl border border-[#222222] bg-[#0d0d0d] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#151515] text-[#888888] hover:text-white hover:bg-[#222222] border border-[#333333] transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Photo Carousel & Key Highlights */}
        <div className="relative md:w-5/12 bg-black flex flex-col min-h-[350px] md:min-h-full">
          <div className="relative flex-1 h-full min-h-[340px]">
            <img
              src={member.photos[photoIndex]}
              alt={member.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/40" />

            {/* Photo Indicators */}
            {member.photos.length > 1 && (
              <div className="absolute top-3 left-3 right-3 flex space-x-1.5 z-10">
                {member.photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i === photoIndex ? 'bg-[#d4af37]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Photo Nav Arrows */}
            {member.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/80"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/80"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Bottom Overlay on Photo */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold uppercase tracking-wider">{member.name}, {member.age}</span>
                <span className="flex items-center space-x-1 rounded-sm bg-[#151515] border border-[#d4af37]/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">
                  <ShieldCheck className="h-3 w-3 text-[#d4af37]" />
                  <span>VERIFIED</span>
                </span>
              </div>
              <p className="text-xs text-[#aaaaaa] font-medium mt-0.5">{member.headline}</p>
              
              <div className="flex items-center space-x-3 text-xs text-[#888888] mt-2">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>{member.location.city}, {member.location.country}</span>
                </span>
                {member.height && (
                  <span className="text-[#888888]">• {member.height}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Comprehensive Details & AI Interactions */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 bg-[#0d0d0d]">
          
          {/* Badges / Verified Tier Grid */}
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">
              Verified Club Credentials
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {member.badges.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-1.5 rounded-sm border border-[#333333] bg-[#151515] px-2.5 py-1 text-xs text-[#d4af37] font-medium"
                >
                  <Award className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>{b.label}</span>
                </div>
              ))}
              {member.netWorthBracket && (
                <div className="flex items-center space-x-1.5 rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300 font-semibold">
                  <span>💰 {member.netWorthBracket}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quote & Bio */}
          {member.quote && (
            <div className="rounded-sm border border-[#222222] bg-[#111111] p-4 relative">
              <Quote className="h-5 w-5 text-[#d4af37]/30 absolute top-3 right-3" />
              <p className="font-serif text-sm italic text-[#e0e0e0] leading-relaxed">
                "{member.quote}"
              </p>
            </div>
          )}

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#888888]">About</h4>
            <p className="mt-1 text-sm text-[#aaaaaa] leading-relaxed">{member.bio}</p>
          </div>

          {/* Education & Career Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-sm border border-[#222222] bg-[#111111] p-3">
              <div className="flex items-center space-x-2 text-[#888888] text-xs">
                <Briefcase className="h-4 w-4 text-[#d4af37]" />
                <span className="font-medium uppercase tracking-wider text-[9px]">Affiliation / Enterprise</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-[#ffffff] font-serif">{member.profession}</p>
              <p className="text-xs text-[#888888]">{member.companyOrAffiliation}</p>
            </div>

            <div className="rounded-sm border border-[#222222] bg-[#111111] p-3">
              <div className="flex items-center space-x-2 text-[#888888] text-xs">
                <GraduationCap className="h-4 w-4 text-[#d4af37]" />
                <span className="font-medium uppercase tracking-wider text-[9px]">Education & Alma Mater</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-[#ffffff] font-serif">{member.education}</p>
            </div>
          </div>

          {/* Luxury Preferences Accordion / Grid */}
          <div className="space-y-2">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">
              Connoisseur Preferences
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {member.luxuryPreferences.champagne && (
                <div className="flex items-center space-x-2 rounded-sm border border-[#222222] bg-[#111111] p-2.5">
                  <Wine className="h-4 w-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#888888] block uppercase tracking-wider">Preferred Cuvée</span>
                    <span className="font-medium text-[#e0e0e0]">{member.luxuryPreferences.champagne}</span>
                  </div>
                </div>
              )}
              {member.luxuryPreferences.watchOrJewelry && (
                <div className="flex items-center space-x-2 rounded-sm border border-[#222222] bg-[#111111] p-2.5">
                  <Watch className="h-4 w-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#888888] block uppercase tracking-wider">Horology & Gems</span>
                    <span className="font-medium text-[#e0e0e0]">{member.luxuryPreferences.watchOrJewelry}</span>
                  </div>
                </div>
              )}
              {member.luxuryPreferences.preferredGetaway && (
                <div className="flex items-center space-x-2 rounded-sm border border-[#222222] bg-[#111111] p-2.5">
                  <Plane className="h-4 w-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#888888] block uppercase tracking-wider">Favorite Escape</span>
                    <span className="font-medium text-[#e0e0e0]">{member.luxuryPreferences.preferredGetaway}</span>
                  </div>
                </div>
              )}
              {member.luxuryPreferences.fineDining && (
                <div className="flex items-center space-x-2 rounded-sm border border-[#222222] bg-[#111111] p-2.5">
                  <Flame className="h-4 w-4 text-[#d4af37] shrink-0" />
                  <div>
                    <span className="text-[10px] text-[#888888] block uppercase tracking-wider">Gastronomy Tables</span>
                    <span className="font-medium text-[#e0e0e0]">{member.luxuryPreferences.fineDining}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ideal First Date */}
          <div className="rounded-sm border border-[#d4af37]/30 bg-[#151515] p-3.5">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37] block">
              Ideal First Date Concept
            </span>
            <p className="mt-1 text-xs text-[#e0e0e0] italic leading-relaxed">
              "{member.idealDate}"
            </p>
          </div>

          {/* AI Wingman / Icebreaker Generator */}
          <div className="rounded-sm border border-[#222222] bg-[#111111] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#d4af37]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#e0e0e0]">AI Wingman Icebreaker Generator</span>
              </div>
              <button
                onClick={generateIcebreakers}
                disabled={loadingIcebreakers}
                className="rounded-sm bg-[#0a0a0a] border border-[#d4af37]/60 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all disabled:opacity-50"
              >
                {loadingIcebreakers ? 'Composing...' : icebreakers.length > 0 ? 'Regenerate' : 'Generate Suave Openers'}
              </button>
            </div>

            {icebreakers.length > 0 && (
              <div className="space-y-2 pt-1">
                {icebreakers.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between rounded-sm border border-[#222222] bg-[#0a0a0a] p-2.5 text-xs text-[#aaaaaa]"
                  >
                    <div>
                      <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-widest block">
                        {item.type}
                      </span>
                      <p className="mt-0.5 text-xs text-[#e0e0e0]">{item.text}</p>
                    </div>
                    <button
                      onClick={() => copyIcebreaker(item.text, idx)}
                      className="ml-2 p-1.5 text-[#888888] hover:text-[#d4af37] transition-colors shrink-0"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons Footer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => onOpenCompatibility(member)}
              className="flex items-center justify-center space-x-1.5 rounded-sm border border-[#d4af37] bg-[#0a0a0a] px-3 py-3 text-xs uppercase tracking-wider font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
            >
              <Sparkles className="h-4 w-4 text-[#d4af37]" />
              <span>Chemistry AI</span>
            </button>

            <button
              onClick={() => onOpenDatePlannerForMember(member)}
              className="flex items-center justify-center space-x-1.5 rounded-sm border border-[#333333] bg-[#151515] px-3 py-3 text-xs uppercase tracking-wider font-semibold text-[#e0e0e0] hover:bg-[#222222] hover:text-[#d4af37] transition-colors"
            >
              <Flame className="h-4 w-4 text-[#d4af37]" />
              <span>Plan VIP Date</span>
            </button>

            <button
              onClick={() => {
                onSuperLike(member);
                onClose();
              }}
              className="flex items-center justify-center space-x-1.5 rounded-sm border border-[#d4af37]/60 bg-[#151515] px-3 py-3 text-xs uppercase tracking-wider font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all shadow-sm"
            >
              <Wine className="h-4 w-4 text-[#d4af37]" />
              <span>Champagne Toast</span>
            </button>

            <button
              onClick={() => {
                onLike(member);
                onClose();
              }}
              className="flex items-center justify-center space-x-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] px-3 py-3 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Connect</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
