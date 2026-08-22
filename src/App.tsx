/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DiscoverFeed } from './components/DiscoverFeed';
import { AiConcierge } from './components/AiConcierge';
import { MessagesView } from './components/MessagesView';
import { LoungeEvents } from './components/LoungeEvents';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { CompatibilityModal } from './components/CompatibilityModal';
import { VipDatePlannerModal } from './components/VipDatePlannerModal';
import { MyProfileModal } from './components/MyProfileModal';
import { AuthModal } from './components/AuthModal';

import { INITIAL_MEMBERS, INITIAL_EVENTS, INITIAL_USER_PERSONAS } from './data/mockMembers';
import { MemberProfile, MatchItem, LoungeEvent, DateItinerary } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'lounge' | 'messages' | 'concierge'>('discover');
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Personas
  const [personas, setPersonas] = useState<MemberProfile[]>(INITIAL_USER_PERSONAS);
  const [currentPersona, setCurrentPersona] = useState<MemberProfile>(INITIAL_USER_PERSONAS[0]);

  // Members & Events
  const [members, setMembers] = useState<MemberProfile[]>(INITIAL_MEMBERS);
  const [events, setEvents] = useState<LoungeEvent[]>(INITIAL_EVENTS);

  // Matches
  const [matches, setMatches] = useState<MatchItem[]>([
    {
      id: 'm-f1',
      member: INITIAL_MEMBERS[0], // Elena Rostova
      matchedAt: 'Today',
      lastMessage: `Bonjour ${INITIAL_USER_PERSONAS[0].name}. Delighted to connect with you.`,
      isSuperLiked: true
    },
    {
      id: 'm-f2',
      member: INITIAL_MEMBERS[1], // Serena Vanderveen
      matchedAt: 'Yesterday',
      lastMessage: 'Are you in New York for Fashion Week or traveling to Aspen?'
    }
  ]);
  const [currentMatch, setCurrentMatch] = useState<MatchItem | null>(null);

  // Modals
  const [selectedDetailMember, setSelectedDetailMember] = useState<MemberProfile | null>(null);
  const [compatibilityMember, setCompatibilityMember] = useState<MemberProfile | null>(null);
  const [datePlannerTarget, setDatePlannerTarget] = useState<MemberProfile | null>(null);
  const [isDatePlannerOpen, setIsDatePlannerOpen] = useState<boolean>(false);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState<boolean>(false);

  // Handle Like
  const handleLikeMember = (member: MemberProfile) => {
    if (!matches.some((m) => m.member.id === member.id)) {
      const newMatch: MatchItem = {
        id: `match-${Date.now()}`,
        member,
        matchedAt: 'Just now',
        lastMessage: 'Connected on Aura Privé'
      };
      setMatches((prev) => [newMatch, ...prev]);
    }
  };

  // Handle Super Like (Vintage Champagne Toast)
  const handleSuperLikeMember = (member: MemberProfile) => {
    if (!matches.some((m) => m.member.id === member.id)) {
      const newMatch: MatchItem = {
        id: `match-${Date.now()}`,
        member,
        matchedAt: 'Just now',
        lastMessage: '🍾 Sent Vintage Dom Pérignon Super-Like',
        isSuperLiked: true
      };
      setMatches((prev) => [newMatch, ...prev]);
    }
  };

  // Switch persona
  const handleSwitchPersona = (newPersona: MemberProfile) => {
    setCurrentPersona(newPersona);
    // Update default match demo if needed
    if (newPersona.gender === 'female') {
      // Find male match
      const maleMember = INITIAL_MEMBERS.find(m => m.gender === 'male') || INITIAL_MEMBERS[0];
      setMatches([
        {
          id: `match-demo-${Date.now()}`,
          member: maleMember,
          matchedAt: 'Today',
          lastMessage: `Good day ${newPersona.name}. Looking forward to a wonderful conversation.`,
          isSuperLiked: true
        }
      ]);
    }
  };

  // Update Persona profile
  const handleUpdateProfile = (updated: MemberProfile) => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthOpen(true);
      return;
    }
    setCurrentPersona(updated);
    setPersonas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Handle Login Success
  const handleLoginSuccess = (userProfile: MemberProfile) => {
    setCurrentPersona(userProfile);
    setIsLoggedIn(true);
  };

  // Handle Register Success
  const handleRegisterSuccess = (newProfile: MemberProfile) => {
    setPersonas((prev) => [newProfile, ...prev]);
    setCurrentPersona(newProfile);
    setMembers((prev) => [newProfile, ...prev]);
    setIsLoggedIn(true);
  };

  // Start chat from modal
  const handleStartChatWithMember = (member: MemberProfile) => {
    let matchObj = matches.find((m) => m.member.id === member.id);
    if (!matchObj) {
      matchObj = {
        id: `match-${Date.now()}`,
        member,
        matchedAt: 'Just now',
        lastMessage: 'Conversation initiated'
      };
      setMatches((prev) => [matchObj!, ...prev]);
    }
    setCurrentMatch(matchObj);
    setActiveTab('messages');
  };

  // Date Planner trigger from profile
  const handleOpenDatePlannerForMember = (member: MemberProfile) => {
    setDatePlannerTarget(member);
    setIsDatePlannerOpen(true);
  };

  // Send Date proposal into message thread
  const handleSendDateProposal = (itinerary: DateItinerary, member: MemberProfile) => {
    let matchObj = matches.find((m) => m.member.id === member.id);
    if (!matchObj) {
      matchObj = {
        id: `match-${Date.now()}`,
        member,
        matchedAt: 'Just now',
        lastMessage: `VIP Date Proposal in ${itinerary.city}`
      };
      setMatches((prev) => [matchObj!, ...prev]);
    }
    setCurrentMatch(matchObj);
    setActiveTab('messages');
  };

  // RSVP toggle
  const handleToggleRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const nextStatus = !ev.rsvpStatus;
          return {
            ...ev,
            rsvpStatus: nextStatus,
            attendeesCount: nextStatus ? ev.attendeesCount + 1 : ev.attendeesCount - 1
          };
        }
        return ev;
      })
    );
  };

  // Send Event Invite
  const handleSendEventInvite = (event: LoungeEvent, member: MemberProfile) => {
    handleStartChatWithMember(member);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] flex flex-col selection:bg-[#d4af37]/30 selection:text-[#d4af37] font-sans">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentPersona={currentPersona}
        personas={personas}
        onSwitchPersona={handleSwitchPersona}
        onOpenMyProfile={() => setIsMyProfileOpen(true)}
        onOpenDatePlanner={() => {
          setDatePlannerTarget(null);
          setIsDatePlannerOpen(true);
        }}
        matchesCount={matches.length}
        unreadCount={matches.length > 0 ? 1 : 0}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => {
          setAuthMode('login');
          setIsAuthOpen(true);
        }}
        onOpenRegister={() => {
          setAuthMode('register');
          setIsAuthOpen(true);
        }}
        onSignOut={() => setIsLoggedIn(false)}
      />

      {/* Guest Mode Notice when signed out */}
      {!isLoggedIn && (
        <div className="bg-gradient-to-r from-[#151515] via-[#1a1813] to-[#151515] border-b border-[#d4af37]/30 px-4 py-2.5 text-center text-xs">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-[#d4af37]">
              <span className="font-serif uppercase tracking-wider font-semibold">Guest Preview:</span>
              <span className="text-[#cccccc]">You are browsing Aura Privé in discovery mode.</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                }}
                className="px-3 py-1 rounded-sm border border-[#333333] text-[#e0e0e0] hover:text-[#d4af37] text-[11px] uppercase tracking-wider"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setIsAuthOpen(true);
                }}
                className="px-3 py-1 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white font-semibold text-[11px] uppercase tracking-wider shadow-sm"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Views */}
      <main className="flex-1 pb-16 md:pb-8">
        {activeTab === 'discover' && (
          <DiscoverFeed
            members={members}
            currentUserProfile={currentPersona}
            onLikeMember={handleLikeMember}
            onSuperLikeMember={handleSuperLikeMember}
            onSelectMember={(m) => setSelectedDetailMember(m)}
            onOpenCompatibility={(m) => setCompatibilityMember(m)}
            onOpenDatePlannerForMember={handleOpenDatePlannerForMember}
          />
        )}

        {activeTab === 'lounge' && (
          <LoungeEvents
            events={events}
            matches={matches.map((m) => m.member)}
            onToggleRsvp={handleToggleRsvp}
            onSendEventInvite={handleSendEventInvite}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesView
            matches={matches}
            currentMatch={currentMatch || (matches[0] || null)}
            onSelectMatch={(m) => setCurrentMatch(m)}
            currentUserProfile={currentPersona}
            onOpenDatePlannerForMember={handleOpenDatePlannerForMember}
            onOpenProfileDetail={(m) => setSelectedDetailMember(m)}
          />
        )}

        {activeTab === 'concierge' && (
          <AiConcierge
            currentUserProfile={currentPersona}
            allMembers={members}
            onSelectMember={(m) => setSelectedDetailMember(m)}
            onOpenDatePlanner={() => {
              setDatePlannerTarget(null);
              setIsDatePlannerOpen(true);
            }}
          />
        )}
      </main>

      {/* Modals & Overlays */}
      <ProfileDetailModal
        member={selectedDetailMember}
        onClose={() => setSelectedDetailMember(null)}
        onLike={handleLikeMember}
        onSuperLike={handleSuperLikeMember}
        onOpenCompatibility={(m) => {
          setSelectedDetailMember(null);
          setCompatibilityMember(m);
        }}
        onOpenDatePlannerForMember={(m) => {
          setSelectedDetailMember(null);
          handleOpenDatePlannerForMember(m);
        }}
        currentUserProfile={currentPersona}
      />

      <CompatibilityModal
        member={compatibilityMember}
        currentUserProfile={currentPersona}
        onClose={() => setCompatibilityMember(null)}
        onStartChat={handleStartChatWithMember}
        onPlanDate={handleOpenDatePlannerForMember}
      />

      <VipDatePlannerModal
        isOpen={isDatePlannerOpen}
        onClose={() => setIsDatePlannerOpen(false)}
        targetMember={datePlannerTarget}
        currentUserProfile={currentPersona}
        onSendDateProposal={handleSendDateProposal}
      />

      <MyProfileModal
        isOpen={isMyProfileOpen}
        onClose={() => setIsMyProfileOpen(false)}
        currentPersona={currentPersona}
        onUpdateProfile={handleUpdateProfile}
        personas={personas}
        onSwitchPersona={handleSwitchPersona}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => {
          setAuthMode('login');
          setIsAuthOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleRegisterSuccess}
        availablePersonas={personas}
      />

    </div>
  );
}
