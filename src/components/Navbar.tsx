import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  User,
  ShieldCheck,
  LogOut,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { PageView, SiteSettings } from '../types';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  settings: SiteSettings;
  onOpenEnquiryModal: (courseName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  settings,
  onOpenEnquiryModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAdmin, loginWithGoogle, logout } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await loginWithGoogle();
    } catch (error) {
      console.error('Login prompt closed or error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Courses', page: 'courses' },
    { label: 'Branches', page: 'branches' },
    { label: 'Admissions', page: 'admissions' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      {/* Top Notification Bar */}
      <div className="bg-[#0A192F] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 font-semibold text-[11px] uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Admissions Open 2026
            </span>
            <span className="truncate text-slate-300 text-[11px] sm:text-xs">
              {settings.announcement || 'New Batches Starting for AI, Python, Full-Stack & ADCA Diplomas across 3 Najafgarh Branches!'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            {/* Click-to-call link for 8700573469 */}
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 font-medium transition-colors"
              title="Call Advance AI Institute"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.phone}</span>
            </a>

            {/* WhatsApp link confirmed from settings */}
            {settings.isWhatsAppEnabled && (
              <a
                href={`https://wa.me/91${settings.phone}?text=${encodeURIComponent(
                  'Hello Advance AI Institute, I want details regarding courses and admissions.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden md:inline">WhatsApp</span>
              </a>
            )}

            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-amber-400" />
              3 Najafgarh Branches
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Placeholder that Admin can customize */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A192F] to-[#1E3A8A] flex items-center justify-center text-amber-400 shadow-md border border-amber-400/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#0A192F] font-brand">
                  ADVANCE <span className="text-amber-600">AI</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-900 font-bold uppercase tracking-wider">
                  Institute
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                IT, AI, Computer & Professional Training Academy
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-[#0A192F] bg-slate-100 border border-slate-200 shadow-xs'
                      : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Auth */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('student-portal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    currentPage === 'student-portal'
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate max-w-[100px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      currentPage === 'admin'
                        ? 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-amber-500 text-white hover:bg-amber-600 border-amber-600'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{isLoggingIn ? 'Signing In...' : 'Student Login'}</span>
              </button>
            )}

            <button
              onClick={() => onOpenEnquiryModal()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span>Apply / Enquire</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnquiryModal()}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-bold"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-xl">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onNavigate('student-portal');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-900 font-semibold text-sm"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span>My Student Portal ({currentUser.displayName || currentUser.email})</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500 text-white font-bold text-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Student / Admin Login with Google</span>
              </button>
            )}

            <div className="pt-2 flex items-center justify-around border-t border-slate-100 text-xs text-slate-600">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1.5 py-1 text-slate-800 font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Call {settings.phone}</span>
              </a>
              {settings.isWhatsAppEnabled && (
                <a
                  href={`https://wa.me/91${settings.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 py-1 text-emerald-600 font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
