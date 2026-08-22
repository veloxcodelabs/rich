import React from 'react';
import { 
  Crown, 
  Sparkles, 
  Compass, 
  MessageSquare, 
  CalendarDays, 
  UserCheck, 
  ShieldCheck, 
  ChevronDown,
  User,
  SlidersHorizontal,
  Flame,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';
import { MemberProfile } from '../types';

interface NavbarProps {
  activeTab: 'discover' | 'lounge' | 'messages' | 'concierge';
  setActiveTab: (tab: 'discover' | 'lounge' | 'messages' | 'concierge') => void;
  currentPersona: MemberProfile;
  personas: MemberProfile[];
  onSwitchPersona: (persona: MemberProfile) => void;
  onOpenMyProfile: () => void;
  onOpenDatePlanner: () => void;
  matchesCount: number;
  unreadCount: number;
  isLoggedIn?: boolean;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  personas,
  onSwitchPersona,
  onOpenMyProfile,
  onOpenDatePlanner,
  matchesCount,
  unreadCount,
  isLoggedIn = true,
  onOpenLogin,
  onOpenRegister,
  onSignOut
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222222] bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
        
        {/* Brand Logo & Crest */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('discover')}>
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] p-[1px] shadow-lg shadow-black/60">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a]">
              <Crown className="h-4 w-4 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg sm:text-xl tracking-[0.18em] uppercase text-[#d4af37] font-semibold">
                AURA PRIVÉ
              </span>
              <span className="bg-[#151515] border border-[#333333] px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#d4af37] font-medium rounded-sm">
                Black Tier
              </span>
            </div>
            <p className="text-[10px] tracking-wider uppercase text-[#666666] hidden sm:block">
              Private Matchmaking for Accomplished Gentlemen & Hot Women
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-light tracking-[0.15em] uppercase">
          <button
            onClick={() => setActiveTab('discover')}
            className={`pb-1 transition-all flex items-center space-x-1.5 ${
              activeTab === 'discover'
                ? 'text-[#d4af37] border-b border-[#d4af37] font-medium'
                : 'text-[#888888] hover:text-[#d4af37]'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('lounge')}
            className={`pb-1 transition-all flex items-center space-x-1.5 ${
              activeTab === 'lounge'
                ? 'text-[#d4af37] border-b border-[#d4af37] font-medium'
                : 'text-[#888888] hover:text-[#d4af37]'
            }`}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            <span>The Lounge</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`relative pb-1 transition-all flex items-center space-x-1.5 ${
              activeTab === 'messages'
                ? 'text-[#d4af37] border-b border-[#d4af37] font-medium'
                : 'text-[#888888] hover:text-[#d4af37]'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[9px] font-bold text-black">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('concierge')}
            className={`pb-1 transition-all flex items-center space-x-1.5 ${
              activeTab === 'concierge'
                ? 'text-[#d4af37] border-b border-[#d4af37] font-medium'
                : 'text-[#888888] hover:text-[#d4af37]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
            <span>Concierge</span>
          </button>
        </nav>

        {/* Right Section: Persona Switcher, Authentication & VIP Actions */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          
          {/* Quick Date Planner Trigger */}
          <button
            onClick={onOpenDatePlanner}
            className="hidden xl:flex items-center space-x-1.5 px-3.5 py-1.5 border border-[#333333] text-[#aaaaaa] text-xs uppercase tracking-widest hover:border-[#d4af37] hover:text-[#d4af37] transition-all rounded-sm bg-[#111111]"
          >
            <Flame className="h-3.5 w-3.5 text-[#d4af37]" />
            <span>Plan VIP Date</span>
          </button>

          {!isLoggedIn ? (
            /* Logged Out: Dedicated Login and Registration Buttons */
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs uppercase tracking-widest font-semibold text-[#e0e0e0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5 text-[#d4af37]" />
                <span>Log In</span>
              </button>

              <button
                onClick={onOpenRegister}
                className="flex items-center space-x-1.5 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] px-4 py-2 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Register</span>
              </button>
            </div>
          ) : (
            /* Logged In: Fast Apply/Register button + Persona Switcher with Sign In & Sign Out options */
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenRegister}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 border border-[#d4af37]/40 text-[#d4af37] text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all rounded-sm bg-[#151515]"
                title="Apply for VIP Membership / Register New Profile"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Register</span>
              </button>

              <button
                onClick={onOpenLogin}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 border border-[#333333] text-[#aaaaaa] text-xs uppercase tracking-widest hover:border-[#d4af37] hover:text-[#d4af37] transition-all rounded-sm bg-[#111111]"
                title="Sign In with Another Account"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Log In</span>
              </button>

              {/* Persona Switcher & Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                  className="flex items-center space-x-2.5 rounded-sm border border-[#333333] bg-[#151515] py-1.5 pl-1.5 pr-2.5 sm:pr-3 text-xs text-[#e0e0e0] hover:border-[#d4af37]/60 transition-all shadow-sm"
                >
                  <img
                    src={currentPersona.photos[0]}
                    alt={currentPersona.name}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-[#d4af37]/60"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium text-white text-xs">{currentPersona.name}</span>
                      <ShieldCheck className="h-3 w-3 text-[#d4af37]" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-[#888888] block -mt-0.5">
                      {currentPersona.gender === 'male' ? "Founder's Circle" : 'Verified VIP'}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-[#666666]" />
                </button>

                {/* Persona & Account Dropdown */}
                {showPersonaMenu && (
                  <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-sm border border-[#333333] bg-[#111111] p-2.5 shadow-2xl z-50">
                    <div className="px-3 py-2 border-b border-[#222222]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#666666]">
                          Active Member Session
                        </span>
                        <span className="bg-[#151515] border border-[#333333] px-1.5 py-0.5 text-[9px] text-[#d4af37] font-mono rounded-sm">
                          BLACK TIER
                        </span>
                      </div>
                      <p className="text-[11px] text-[#888888] mt-1">
                        Switch active persona or manage your private authentication:
                      </p>
                    </div>

                    <div className="py-1 space-y-1 max-h-48 overflow-y-auto">
                      {personas.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            onSwitchPersona(p);
                            setShowPersonaMenu(false);
                          }}
                          className={`flex w-full items-center space-x-3 rounded-sm px-3 py-2 text-left text-xs transition-colors ${
                            p.id === currentPersona.id
                              ? 'bg-[#151515] border border-[#d4af37]/40 text-[#d4af37]'
                              : 'hover:bg-[#1a1a1a] text-[#aaaaaa]'
                          }`}
                        >
                          <img
                            src={p.photos[0]}
                            alt={p.name}
                            className="h-8 w-8 rounded-full object-cover ring-1 ring-[#333333]"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white truncate">{p.name}, {p.age}</span>
                              <span className="text-[10px] text-[#666666]">{p.location.city}</span>
                            </div>
                            <p className="text-[10px] text-[#888888] truncate">{p.headline}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 border-t border-[#222222] pt-2 space-y-1.5">
                      <button
                        onClick={() => {
                          setShowPersonaMenu(false);
                          onOpenMyProfile();
                        }}
                        className="flex w-full items-center justify-center space-x-2 rounded-sm border border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-widest py-2 hover:bg-[#d4af37] hover:text-black transition-all bg-[#0a0a0a]"
                      >
                        <User className="h-3.5 w-3.5" />
                        <span>Member Dossier</span>
                      </button>

                      <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-[#1a1a1a]">
                        <button
                          onClick={() => {
                            setShowPersonaMenu(false);
                            onOpenRegister();
                          }}
                          className="flex items-center justify-center space-x-1 py-1.5 rounded-sm bg-[#151515] border border-[#333333] text-[10px] uppercase tracking-wider text-[#d4af37] hover:bg-[#222222]"
                        >
                          <UserPlus className="h-3 w-3" />
                          <span>Register</span>
                        </button>

                        <button
                          onClick={() => {
                            setShowPersonaMenu(false);
                            onOpenLogin();
                          }}
                          className="flex items-center justify-center space-x-1 py-1.5 rounded-sm bg-[#151515] border border-[#333333] text-[10px] uppercase tracking-wider text-[#aaaaaa] hover:text-white hover:bg-[#222222]"
                        >
                          <LogIn className="h-3 w-3" />
                          <span>Log In</span>
                        </button>
                      </div>

                      {onSignOut && (
                        <button
                          onClick={() => {
                            setShowPersonaMenu(false);
                            onSignOut();
                          }}
                          className="flex w-full items-center justify-center space-x-1.5 py-1.5 text-[10px] uppercase tracking-wider text-[#777777] hover:text-rose-400 transition-colors"
                        >
                          <LogOut className="h-3 w-3" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#222222] bg-[#050505] py-2 px-1">
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[10px] uppercase tracking-wider ${
            activeTab === 'discover' ? 'text-[#d4af37] font-semibold' : 'text-[#666666]'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Discover</span>
        </button>

        <button
          onClick={() => setActiveTab('lounge')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[10px] uppercase tracking-wider ${
            activeTab === 'lounge' ? 'text-[#d4af37] font-semibold' : 'text-[#666666]'
          }`}
        >
          <CalendarDays className="h-4 w-4" />
          <span>The Lounge</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`relative flex flex-col items-center space-y-1 py-1 px-3 text-[10px] uppercase tracking-wider ${
            activeTab === 'messages' ? 'text-[#d4af37] font-semibold' : 'text-[#666666]'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Messages</span>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d4af37] text-[8px] font-bold text-black">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('concierge')}
          className={`flex flex-col items-center space-y-1 py-1 px-3 text-[10px] uppercase tracking-wider ${
            activeTab === 'concierge' ? 'text-[#d4af37] font-semibold' : 'text-[#666666]'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Concierge</span>
        </button>
      </div>
    </header>
  );
};
