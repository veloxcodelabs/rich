import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  Sparkles, 
  Wine, 
  Flame, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  SlidersHorizontal, 
  LayoutGrid, 
  Layers, 
  Award,
  ChevronLeft,
  ChevronRight,
  Info,
  Check,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemberProfile } from '../types';

interface DiscoverFeedProps {
  members: MemberProfile[];
  currentUserProfile: MemberProfile;
  onLikeMember: (member: MemberProfile) => void;
  onSuperLikeMember: (member: MemberProfile) => void;
  onSelectMember: (member: MemberProfile) => void;
  onOpenCompatibility: (member: MemberProfile) => void;
  onOpenDatePlannerForMember: (member: MemberProfile) => void;
}

export const DiscoverFeed: React.FC<DiscoverFeedProps> = ({
  members,
  currentUserProfile,
  onLikeMember,
  onSuperLikeMember,
  onSelectMember,
  onOpenCompatibility,
  onOpenDatePlannerForMember
}) => {
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [genderFilter, setGenderFilter] = useState<'all' | 'female' | 'male'>(
    currentUserProfile.gender === 'male' ? 'female' : 'male'
  );
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [onlyVerifiedAsset, setOnlyVerifiedAsset] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showToast, setShowToast] = useState<{ message: string; type: 'like' | 'superlike' | 'pass' } | null>(null);

  // Filter members
  const filteredMembers = members.filter((m) => {
    // Exclude current user persona
    if (m.id === currentUserProfile.id) return false;
    // Gender filter
    if (genderFilter !== 'all' && m.gender !== genderFilter) return false;
    // City filter
    if (cityFilter !== 'all' && m.location.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    // Verified asset filter
    if (onlyVerifiedAsset && !m.netWorthBracket && !m.badges.some(b => b.type === 'verified_asset')) return false;
    return true;
  });

  const activeMember = filteredMembers[currentIndex % (filteredMembers.length || 1)];

  const triggerToast = (message: string, type: 'like' | 'superlike' | 'pass') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 2500);
  };

  const handleNext = () => {
    setCurrentPhotoIndex(0);
    setCurrentIndex((prev) => (prev + 1) % filteredMembers.length);
  };

  const handlePass = () => {
    if (!activeMember) return;
    triggerToast(`Passed on ${activeMember.name}`, 'pass');
    handleNext();
  };

  const handleLike = () => {
    if (!activeMember) return;
    onLikeMember(activeMember);
    triggerToast(`Connected with ${activeMember.name}! Added to Connections.`, 'like');
    handleNext();
  };

  const handleSuperLike = () => {
    if (!activeMember) return;
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#d97706', '#ffffff']
    });
    onSuperLikeMember(activeMember);
    triggerToast(`🍾 Vintage Champagne Toast sent to ${activeMember.name}! Priority match created.`, 'superlike');
    handleNext();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
      
      {/* Top Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-sm border border-[#222222] bg-[#111111] p-3.5 shadow-md">
        
        {/* Gender / Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => { setGenderFilter('all'); setCurrentIndex(0); }}
            className={`rounded-sm px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
              genderFilter === 'all'
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-[#aaaaaa] hover:text-white bg-[#151515] border border-[#333333]'
            }`}
          >
            All Members
          </button>
          <button
            onClick={() => { setGenderFilter('female'); setCurrentIndex(0); }}
            className={`rounded-sm px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
              genderFilter === 'female'
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-[#aaaaaa] hover:text-white bg-[#151515] border border-[#333333]'
            }`}
          >
            ✨ Hot Women
          </button>
          <button
            onClick={() => { setGenderFilter('male'); setCurrentIndex(0); }}
            className={`rounded-sm px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
              genderFilter === 'male'
                ? 'bg-[#d4af37] text-black font-semibold shadow-sm'
                : 'text-[#aaaaaa] hover:text-white bg-[#151515] border border-[#333333]'
            }`}
          >
            💎 Accomplished Gentlemen
          </button>
        </div>

        {/* Right Filter Actions: City & Asset Verified */}
        <div className="flex items-center space-x-3 text-xs">
          
          {/* City Dropdown */}
          <div className="flex items-center space-x-1.5 rounded-sm border border-[#333333] bg-[#151515] px-2.5 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
            <select
              value={cityFilter}
              onChange={(e) => { setCityFilter(e.target.value); setCurrentIndex(0); }}
              className="bg-transparent text-[#e0e0e0] focus:outline-none text-xs pr-1"
            >
              <option value="all" className="bg-[#111111] text-white">All Global Hubs</option>
              <option value="paris" className="bg-[#111111] text-white">Paris</option>
              <option value="london" className="bg-[#111111] text-white">London</option>
              <option value="new york" className="bg-[#111111] text-white">New York</option>
              <option value="monaco" className="bg-[#111111] text-white">Monaco</option>
              <option value="dubai" className="bg-[#111111] text-white">Dubai</option>
              <option value="miami" className="bg-[#111111] text-white">Miami</option>
            </select>
          </div>

          {/* Verified Asset Toggle */}
          <button
            onClick={() => setOnlyVerifiedAsset(!onlyVerifiedAsset)}
            className={`flex items-center space-x-1.5 rounded-sm border px-3 py-1.5 uppercase tracking-wider text-[11px] transition-all ${
              onlyVerifiedAsset
                ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] font-semibold'
                : 'border-[#333333] bg-[#151515] text-[#888888] hover:text-[#e0e0e0]'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Verified Credentials</span>
            <span className="sm:hidden">Verified</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-sm border border-[#333333] bg-[#151515] p-0.5">
            <button
              onClick={() => setViewMode('deck')}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === 'deck' ? 'bg-[#d4af37] text-black' : 'text-[#888888] hover:text-white'
              }`}
              title="Deck Swipe Mode"
            >
              <Layers className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-sm transition-colors ${
                viewMode === 'grid' ? 'bg-[#d4af37] text-black' : 'text-[#888888] hover:text-white'
              }`}
              title="Gallery Grid Mode"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Floating Action Feedback Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 rounded-full border border-[#d4af37] bg-[#111111]/95 px-5 py-2.5 text-xs font-semibold text-[#d4af37] shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
          <span>{showToast.message}</span>
        </div>
      )}

      {/* Main Content Area */}
      {filteredMembers.length === 0 ? (
        <div className="rounded-sm border border-[#222222] bg-[#111111] py-20 text-center space-y-3">
          <Wine className="h-10 w-10 text-[#d4af37]/60 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#e0e0e0] uppercase tracking-wider">
            No Members Match Your Current Filter
          </h3>
          <p className="text-xs text-[#888888] max-w-sm mx-auto">
            Try expanding your city selection or viewing all members to discover accomplished matches worldwide.
          </p>
          <button
            onClick={() => { setGenderFilter('all'); setCityFilter('all'); setOnlyVerifiedAsset(false); }}
            className="mt-2 rounded-sm bg-[#151515] border border-[#d4af37] px-4 py-2 text-xs uppercase tracking-widest text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'deck' ? (
        
        /* --- DECK / SWIPE CARD VIEW --- */
        <div className="mx-auto max-w-lg">
          {activeMember && (
            <div className="relative rounded-2xl border border-[#222222] bg-[#111111] shadow-2xl overflow-hidden group">
              
              {/* Photo Area */}
              <div className="relative h-[460px] sm:h-[500px] w-full bg-[#0a0a0a]">
                <img
                  src={activeMember.photos[currentPhotoIndex % activeMember.photos.length]}
                  alt={activeMember.name}
                  className="h-full w-full object-cover select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-black/40" />

                {/* Photo Carousel Indicators */}
                {activeMember.photos.length > 1 && (
                  <div className="absolute top-3 left-4 right-4 flex space-x-1.5 z-10">
                    {activeMember.photos.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i === currentPhotoIndex ? 'bg-[#d4af37]' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Photo Click Tap Zones */}
                {activeMember.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPhotoIndex((prev) => (prev - 1 + activeMember.photos.length) % activeMember.photos.length);
                      }}
                      className="absolute left-0 top-0 bottom-24 w-1/3 z-10 focus:outline-none"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPhotoIndex((prev) => (prev + 1) % activeMember.photos.length);
                      }}
                      className="absolute right-0 top-0 bottom-24 w-1/3 z-10 focus:outline-none"
                    />
                  </>
                )}

                {/* Top Badges */}
                <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center space-x-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#d4af37]/40 px-3 py-1 text-[11px] font-semibold text-[#d4af37]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span>{activeMember.activeStatus}</span>
                  </div>

                  <button
                    onClick={() => onSelectMember(activeMember)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 backdrop-blur-md border border-[#333333] text-[#aaaaaa] hover:text-white hover:border-[#d4af37]"
                    title="View Full Profile"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2 z-10">
                  
                  {/* Name & Age */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide">
                        {activeMember.name}, {activeMember.age}
                      </h2>
                      <ShieldCheck className="h-5 w-5 text-[#d4af37]" />
                    </div>
                  </div>

                  {/* Headline & Career */}
                  <p className="text-xs sm:text-sm font-light text-[#e0e0e0] leading-snug">
                    {activeMember.headline}
                  </p>

                  <div className="flex items-center space-x-3 text-xs text-[#888888]">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3.5 w-3.5 text-[#d4af37]" />
                      <span>{activeMember.location.city}, {activeMember.location.country}</span>
                    </span>
                    {activeMember.netWorthBracket && (
                      <span className="font-bold text-[#d4af37] bg-[#151515] border border-[#333333] px-2 py-0.5 rounded-sm">
                        💰 {activeMember.netWorthBracket}
                      </span>
                    )}
                  </div>

                  {/* Lifestyle pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeMember.lifestyle.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-sm bg-[#151515] border border-[#333333] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[#aaaaaa]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="flex items-center justify-around p-4 bg-[#0e0e0e] border-t border-[#222222]">
                
                {/* Pass */}
                <button
                  onClick={handlePass}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#333333] bg-[#151515] text-[#888888] hover:border-[#666666] hover:text-white transition-all shadow-md active:scale-95"
                  title="Pass"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* AI Chemistry Score */}
                <button
                  onClick={() => onOpenCompatibility(activeMember)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#151515] text-[#d4af37] hover:bg-[#d4af37]/10 transition-all shadow-md active:scale-95"
                  title="AI Chemistry Matrix"
                >
                  <Sparkles className="h-5 w-5" />
                </button>

                {/* Champagne Super-Like */}
                <button
                  onClick={handleSuperLike}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white hover:brightness-110 transition-all shadow-lg active:scale-95"
                  title="Send Vintage Champagne Super-Like"
                >
                  <Wine className="h-6 w-6 fill-white" />
                </button>

                {/* Plan VIP Date */}
                <button
                  onClick={() => onOpenDatePlannerForMember(activeMember)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#333333] bg-[#151515] text-[#aaaaaa] hover:border-[#d4af37] hover:text-[#d4af37] transition-all shadow-md active:scale-95"
                  title="Plan Bespoke VIP Date"
                >
                  <Flame className="h-5 w-5" />
                </button>

                {/* Like / Connect */}
                <button
                  onClick={handleLike}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37] bg-[#151515] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all shadow-md active:scale-95"
                  title="Connect"
                >
                  <Heart className="h-5 w-5 fill-[#d4af37]/20" />
                </button>

              </div>

            </div>
          )}

          {/* Member Counter Footer */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#888888] px-2">
            <span>Viewing {currentIndex + 1} of {filteredMembers.length} curated members</span>
            <button
              onClick={() => onSelectMember(activeMember)}
              className="text-[#d4af37] hover:underline uppercase tracking-wider text-[11px]"
            >
              Open Full Dossier & Portfolio →
            </button>
          </div>
        </div>

      ) : (

        /* --- GALLERY GRID VIEW --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="group relative rounded-xl border border-[#222222] bg-[#111111] overflow-hidden cursor-pointer hover:border-[#d4af37]/60 transition-all hover:shadow-2xl flex flex-col"
            >
              <div className="relative h-72 w-full overflow-hidden bg-[#0a0a0a]">
                <img
                  src={member.photos[0]}
                  alt={member.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="rounded-full bg-black/70 backdrop-blur-sm border border-[#d4af37]/30 px-2 py-0.5 text-[10px] font-semibold text-[#d4af37]">
                    {member.location.city}
                  </span>
                  {member.netWorthBracket && (
                    <span className="rounded-sm bg-[#151515] border border-[#333333] px-2 py-0.5 text-[10px] font-bold text-[#d4af37]">
                      💰 {member.netWorthBracket}
                    </span>
                  )}
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif text-xl font-bold">{member.name}, {member.age}</span>
                    <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <p className="text-xs text-[#888888] truncate">{member.headline}</p>
                </div>
              </div>

              {/* Grid Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#111111]">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-xs text-[#888888]">
                    <Briefcase className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate">{member.profession} • {member.companyOrAffiliation}</span>
                  </div>
                  <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#222222]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCompatibility(member);
                    }}
                    className="flex items-center space-x-1 text-xs text-[#d4af37] hover:text-white uppercase tracking-wider text-[11px]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Chemistry</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSuperLikeMember(member);
                        triggerToast(`Sent Champagne Super-Like to ${member.name}!`, 'superlike');
                      }}
                      className="p-1.5 rounded-sm border border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37]/10"
                      title="Champagne Super-Like"
                    >
                      <Wine className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeMember(member);
                        triggerToast(`Connected with ${member.name}!`, 'like');
                      }}
                      className="p-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white font-bold"
                      title="Connect"
                    >
                      <Heart className="h-3.5 w-3.5 fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      )}

    </div>
  );
};
