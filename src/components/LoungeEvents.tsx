import React, { useState } from 'react';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Shirt, 
  Wine, 
  Check, 
  Send,
  X
} from 'lucide-react';
import { LoungeEvent, MemberProfile } from '../types';

interface LoungeEventsProps {
  events: LoungeEvent[];
  matches: MemberProfile[];
  onToggleRsvp: (eventId: string) => void;
  onSendEventInvite: (event: LoungeEvent, member: MemberProfile) => void;
}

export const LoungeEvents: React.FC<LoungeEventsProps> = ({
  events,
  matches,
  onToggleRsvp,
  onSendEventInvite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [invitingEvent, setInvitingEvent] = useState<LoungeEvent | null>(null);
  const [invitedMemberId, setInvitedMemberId] = useState<string | null>(null);

  const categories = ['All', 'Gala & Soirée', 'Yacht & Regatta', 'Private Art & Fashion', 'Polo & Equestrian'];

  const filteredEvents = events.filter((ev) => {
    if (selectedCategory !== 'All' && ev.category !== selectedCategory) return false;
    return true;
  });

  const handleInvite = (member: MemberProfile) => {
    if (invitingEvent) {
      onSendEventInvite(invitingEvent, member);
      setInvitedMemberId(member.id);
      setTimeout(() => {
        setInvitedMemberId(null);
        setInvitingEvent(null);
      }, 1500);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
      
      {/* Header Banner */}
      <div className="mb-6 rounded-sm border border-[#222222] bg-[#111111] p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-sm bg-[#151515] px-2 py-0.5 text-[9px] font-bold tracking-widest text-[#d4af37] border border-[#333333] uppercase">
              PRIVATE SALON & EVENTS
            </span>
            <span className="text-xs text-[#888888]">• Members Only</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#ffffff] uppercase tracking-wider mt-1.5">
            The Private Lounge & Global Soirées
          </h1>
          <p className="text-xs text-[#888888] mt-1 max-w-xl">
            Curated gatherings for Aura Privé members worldwide: Monaco Grand Prix superyacht galas, St. Moritz snow polo, and Art Basel previews.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-sm px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white shadow-md'
                  : 'bg-[#151515] border border-[#333333] text-[#aaaaaa] hover:text-[#d4af37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-[#222222] bg-[#0d0d0d] overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all shadow-xl group"
          >
            {/* Event Image */}
            <div className="relative h-60 w-full overflow-hidden bg-black">
              <img
                src={event.coverImage}
                alt={event.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-black/50" />

              {/* Top Tags */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-sm bg-black/70 backdrop-blur-sm border border-[#d4af37]/40 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#d4af37]">
                  {event.category}
                </span>
                <span className="flex items-center space-x-1 rounded-sm bg-black/70 backdrop-blur-sm border border-[#333333] px-2.5 py-0.5 text-[10px] text-[#e0e0e0]">
                  <MapPin className="h-3 w-3 text-[#d4af37]" />
                  <span>{event.city}</span>
                </span>
              </div>

              {/* Title on Image */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <p className="text-[11px] text-[#d4af37] font-semibold font-mono tracking-wider">{event.date}</p>
                <h3 className="font-serif text-xl font-bold mt-0.5 leading-snug text-white uppercase tracking-wide">{event.title}</h3>
              </div>
            </div>

            {/* Event Body Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#0d0d0d]">
              <div className="space-y-2.5">
                <p className="text-xs text-[#aaaaaa] leading-relaxed">
                  {event.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="flex items-center space-x-1.5 text-[#888888] bg-[#151515] p-2 rounded-sm border border-[#222222]">
                    <Shirt className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate"><strong>Dress:</strong> {event.dressCode}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[#888888] bg-[#151515] p-2 rounded-sm border border-[#222222]">
                    <Users className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                    <span><strong>Members RSVP'd:</strong> {event.attendeesCount} VIPs</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#222222]">
                <button
                  onClick={() => setInvitingEvent(event)}
                  className="flex items-center space-x-1.5 rounded-sm border border-[#d4af37] bg-[#0a0a0a] px-3.5 py-2 text-xs uppercase tracking-widest font-semibold text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                >
                  <Wine className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>Invite a Match</span>
                </button>

                <button
                  onClick={() => onToggleRsvp(event.id)}
                  className={`flex items-center space-x-1.5 rounded-sm px-4 py-2 text-xs uppercase tracking-widest font-bold transition-all shadow-md ${
                    event.rsvpStatus
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300'
                      : 'bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white hover:brightness-110'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>{event.rsvpStatus ? 'Attending (VIP List)' : 'Confirm RSVP'}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Invite Match to Event Modal */}
      {invitingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-xl border border-[#222222] bg-[#0d0d0d] p-6 shadow-2xl space-y-4">
            
            <button
              onClick={() => setInvitingEvent(null)}
              className="absolute top-4 right-4 text-[#888888] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">
                VIP Companion Invitation
              </span>
              <h3 className="font-serif text-lg font-bold text-[#ffffff] uppercase tracking-wide">
                Invite to {invitingEvent.title}
              </h3>
              <p className="text-xs text-[#888888]">
                Select one of your verified connections to accompany you:
              </p>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {matches.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#888888]">
                  You have not matched with any members yet. Connect on the Curated Feed first!
                </div>
              ) : (
                matches.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleInvite(m)}
                    disabled={invitedMemberId === m.id}
                    className="flex w-full items-center justify-between rounded-sm border border-[#222222] bg-[#151515] p-3 hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={m.photos[0]}
                        alt={m.name}
                        className="h-10 w-10 rounded-full object-cover ring-1 ring-[#d4af37]"
                      />
                      <div className="text-left">
                        <span className="text-xs font-bold text-[#e0e0e0] block">{m.name}, {m.age}</span>
                        <span className="text-[10px] text-[#888888]">{m.headline}</span>
                      </div>
                    </div>

                    <span className="rounded-sm bg-[#0a0a0a] border border-[#d4af37]/40 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-[#d4af37]">
                      {invitedMemberId === m.id ? 'Invited! ✓' : 'Send Invite'}
                    </span>
                  </button>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
