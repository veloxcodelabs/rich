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

import { INITIAL_MEMBERS, INITIAL_EVENTS, INITIAL_USER_PERSONAS } from './data/mockMembers';
import { MemberProfile, MatchItem, LoungeEvent, DateItinerary } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'lounge' | 'messages' | 'concierge'>('discover');
  
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
    setCurrentPersona(updated);
    setPersonas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
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
      />

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
      />

    </div>
  );
}
