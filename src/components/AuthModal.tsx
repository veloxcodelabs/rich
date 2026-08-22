import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Briefcase, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  KeyRound,
  FileCheck2
} from 'lucide-react';
import { MemberProfile, Gender } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (userProfile: MemberProfile) => void;
  onRegisterSuccess: (newProfile: MemberProfile) => void;
  availablePersonas: MemberProfile[];
}

const PRESET_AVATARS = [
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    gender: 'male' as Gender,
    label: 'Gentleman I'
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    gender: 'male' as Gender,
    label: 'Gentleman II'
  },
  {
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    gender: 'female' as Gender,
    label: 'Lady I'
  },
  {
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    gender: 'female' as Gender,
    label: 'Lady II'
  }
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  onRegisterSuccess,
  availablePersonas
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Sync mode when initialMode changes
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('28');
  const [regGender, setRegGender] = useState<Gender>('female');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCity, setRegCity] = useState('Monaco');
  const [regProfession, setRegProfession] = useState('High Jewelry Curator & Private Investor');
  const [regCompany, setRegCompany] = useState('Maison Privée Geneva');
  const [regEducation, setRegEducation] = useState('Sorbonne & GIA London');
  const [regHeadline, setRegHeadline] = useState('Living between Monte Carlo, St. Moritz & Milan');
  const [regBio, setRegBio] = useState('Curator of rare gems and contemporary art. Passionate about superyacht regattas, Michelin-starred gastronomy, and private opera galas.');
  const [regIdealDate, setRegIdealDate] = useState('Sunset Dom Pérignon on a Riva yacht cruising the Cap d\'Antibes followed by dinner at Mirazur.');
  const [regNetWorth, setRegNetWorth] = useState('$10M - $25M Verified');
  const [regPhoto, setRegPhoto] = useState(PRESET_AVATARS[2].url);
  const [regLoading, setRegLoading] = useState(false);
  const [regVettingStep, setRegVettingStep] = useState<string>('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    setTimeout(() => {
      // Find matching or default to first persona
      const matched = availablePersonas.find(
        p => p.name.toLowerCase().includes(loginEmail.toLowerCase()) || loginEmail === ''
      ) || availablePersonas[0];

      setLoginLoading(false);
      onLoginSuccess(matched);
      onClose();
    }, 900);
  };

  const handleQuickLogin = (persona: MemberProfile) => {
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      onLoginSuccess(persona);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    setRegLoading(true);
    setRegVettingStep('Initiating Biometric & Asset Verification...');

    setTimeout(() => {
      setRegVettingStep('Vetting Club Credentials with Admissions Committee...');
    }, 800);

    setTimeout(() => {
      setRegVettingStep('Approving Black Tier Lifetime Membership...');
    }, 1600);

    setTimeout(() => {
      const newProfile: MemberProfile = {
        id: `user-${Date.now()}`,
        name: regName,
        age: parseInt(regAge) || 28,
        gender: regGender,
        headline: regHeadline || `${regProfession} based in ${regCity}`,
        profession: regProfession,
        companyOrAffiliation: regCompany,
        education: regEducation,
        location: {
          city: regCity,
          country: regCity === 'Monaco' ? 'Monaco' : regCity === 'London' ? 'United Kingdom' : regCity === 'Paris' ? 'France' : regCity === 'New York' ? 'United States' : 'United Arab Emirates'
        },
        netWorthBracket: regNetWorth,
        bio: regBio,
        photos: [regPhoto],
        badges: [
          { label: 'Black Tier Founding', type: 'black_card' },
          { label: 'Asset Verified', type: 'verified_asset' },
          { label: 'Club Approved', type: 'founder' }
        ],
        lifestyle: ['Private Aviation', 'Fine Art', 'Superyachts', 'Haute Horlogerie'],
        interests: ['Michelin Dining', 'Opera & Galas', 'Wine Collecting', 'Philanthropy'],
        favoriteDestinations: [regCity, 'St. Moritz', 'Cap d\'Antibes', 'Aspen'],
        idealDate: regIdealDate,
        passions: ['Art Basel', 'Monaco Yacht Show', 'Wimbledon Private Box'],
        luxuryPreferences: {
          champagne: 'Dom Pérignon P2 2004',
          watchOrJewelry: 'Patek Philippe Nautilus / Graff Diamonds',
          preferredGetaway: 'Villa in Saint-Jean-Cap-Ferrat',
          fineDining: 'L\'Ambroisie Paris'
        },
        verified: true,
        activeStatus: 'Online'
      };

      setRegLoading(false);
      setRegVettingStep('');
      onRegisterSuccess(newProfile);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-xl border border-[#222222] bg-[#0d0d0d] shadow-2xl p-6 sm:p-8 overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#151515] text-[#888888] hover:text-white border border-[#333333] transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center pb-5 border-b border-[#222222]">
          <div className="inline-flex items-center space-x-2 rounded-sm border border-[#d4af37]/40 bg-[#151515] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#d4af37]">
            <Crown className="h-3.5 w-3.5" />
            <span>AURA PRIVÉ ADMISSIONS</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#ffffff] uppercase tracking-wider mt-1">
            {mode === 'login' ? 'Private Member Access' : 'Apply for VIP Membership'}
          </h2>
          <p className="text-xs text-[#888888] max-w-md mx-auto">
            {mode === 'login' 
              ? 'Enter your confidential credentials to enter the Black Tier matchmaking portal.' 
              : 'Submit your credentials for committee review. Approved applicants receive immediate access.'}
          </p>
        </div>

        {/* Switch Mode Tabs */}
        <div className="mt-5 flex rounded-sm border border-[#222222] bg-[#050505] p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm ${
              mode === 'login'
                ? 'bg-[#151515] border border-[#d4af37]/50 text-[#d4af37] shadow-sm'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Member Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm ${
              mode === 'register'
                ? 'bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] text-white font-bold shadow-sm'
                : 'text-[#888888] hover:text-white'
            }`}
          >
            Apply for Membership
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <div className="mt-6 space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1.5">
                  Member Email or Black Card ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. alexander.vance@auraprive.club"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-sm border border-[#333333] bg-[#151515] pl-9 pr-3.5 py-2.5 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none placeholder-[#555555]"
                  />
                  <Mail className="h-4 w-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888]">
                    Confidential Passcode
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Please contact your Private Concierge via concierge@auraprive.club for passcode recovery.')}
                    className="text-[10px] uppercase tracking-wider text-[#d4af37] hover:underline"
                  >
                    Forgot Code?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full rounded-sm border border-[#333333] bg-[#151515] pl-9 pr-3.5 py-2.5 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none placeholder-[#555555]"
                  />
                  <KeyRound className="h-4 w-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#888888] pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded-sm accent-[#d4af37]" />
                  <span className="text-[11px]">Remember terminal authentication</span>
                </label>
                <span className="flex items-center space-x-1 text-[#d4af37] text-[10px] uppercase tracking-widest font-mono">
                  <ShieldCheck className="h-3 w-3" />
                  <span>256-Bit Encrypted</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex items-center justify-center space-x-2 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] py-3 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md disabled:opacity-50 mt-2"
              >
                {loginLoading ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    <span>Enter Aura Privé Lounge</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Option */}
            <div className="border-t border-[#222222] pt-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#888888] block mb-2 text-center">
                Instant VIP Pass / Test Member Profiles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availablePersonas.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleQuickLogin(p)}
                    className="flex items-center space-x-2.5 rounded-sm border border-[#222222] bg-[#111111] p-2 hover:border-[#d4af37]/60 hover:bg-[#151515] transition-all text-left group"
                  >
                    <img
                      src={p.photos[0]}
                      alt={p.name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-[#333333] group-hover:ring-[#d4af37]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white truncate">{p.name}</span>
                        <span className="text-[9px] text-[#d4af37] font-mono">{p.gender === 'male' ? 'Gentleman' : 'Lady'}</span>
                      </div>
                      <p className="text-[10px] text-[#888888] truncate">{p.profession}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REGISTRATION / MEMBERSHIP APPLICATION FORM */}
        {mode === 'register' && (
          <div className="mt-6 space-y-6">
            {regLoading ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                    Executive Vetting in Progress
                  </h3>
                  <p className="text-xs text-[#d4af37] font-mono animate-pulse">
                    {regVettingStep}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                
                {/* Gender / Membership Cohort */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#d4af37] block mb-1.5">
                    Membership Cohort
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRegGender('male');
                        setRegPhoto(PRESET_AVATARS[0].url);
                      }}
                      className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all ${
                        regGender === 'male'
                          ? 'border-[#d4af37] bg-[#151515] text-[#d4af37]'
                          : 'border-[#333333] bg-[#0a0a0a] text-[#888888] hover:text-white'
                      }`}
                    >
                      💎 Accomplished Gentleman
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRegGender('female');
                        setRegPhoto(PRESET_AVATARS[2].url);
                      }}
                      className={`py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-sm border transition-all ${
                        regGender === 'female'
                          ? 'border-[#d4af37] bg-[#151515] text-[#d4af37]'
                          : 'border-[#333333] bg-[#0a0a0a] text-[#888888] hover:text-white'
                      }`}
                    >
                      ✨ Hot Woman
                    </button>
                  </div>
                </div>

                {/* Name & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Julian Sterling"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="80"
                      value={regAge}
                      onChange={(e) => setRegAge(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Passcode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      VIP Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.name@private.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Private Passcode
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Create confidential code"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* City & Net Worth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Primary Residence
                    </label>
                    <select
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="Monaco">Monaco</option>
                      <option value="London">London, UK</option>
                      <option value="Paris">Paris, France</option>
                      <option value="New York">New York, USA</option>
                      <option value="Dubai">Dubai, UAE</option>
                      <option value="Zurich">Zurich, Switzerland</option>
                      <option value="Milan">Milan, Italy</option>
                      <option value="Los Angeles">Los Angeles, USA</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Liquid Asset Tier
                    </label>
                    <select
                      value={regNetWorth}
                      onChange={(e) => setRegNetWorth(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="$5M - $10M Verified">$5M - $10M Verified</option>
                      <option value="$10M - $25M Verified">$10M - $25M Verified</option>
                      <option value="$25M - $50M Verified">$25M - $50M Verified</option>
                      <option value="$50M+ Forbes Tier">$50M+ Forbes Tier</option>
                    </select>
                  </div>
                </div>

                {/* Profession & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Profession & Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Managing Partner / Supermodel"
                      value={regProfession}
                      onChange={(e) => setRegProfession(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                      Enterprise / Alma Mater
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Oxford / Private Family Office"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Select Portrait */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1.5">
                    Select Verified Portrait
                  </label>
                  <div className="flex items-center space-x-3 overflow-x-auto py-1">
                    {PRESET_AVATARS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setRegPhoto(av.url)}
                        className={`relative rounded-full p-0.5 transition-all shrink-0 ${
                          regPhoto === av.url ? 'ring-2 ring-[#d4af37]' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt={av.label}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        {regPhoto === av.url && (
                          <span className="absolute bottom-0 right-0 h-4 w-4 bg-[#d4af37] rounded-full text-black flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-[#888888] block mb-1">
                    Lifestyle Statement & Bio
                  </label>
                  <textarea
                    rows={2}
                    value={regBio}
                    onChange={(e) => setRegBio(e.target.value)}
                    className="w-full rounded-sm border border-[#333333] bg-[#151515] px-3.5 py-2 text-xs text-[#e0e0e0] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                {/* Submit Application Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-sm bg-gradient-to-tr from-[#c5a059] to-[#8e6e3d] py-3 text-xs uppercase tracking-widest font-bold text-white hover:brightness-110 transition-all shadow-md"
                >
                  <FileCheck2 className="h-4 w-4" />
                  <span>Submit Application for Instant Vetting</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
