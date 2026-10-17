import React from 'react';
import {
  GraduationCap,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PageView, SiteSettings, Branch } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  settings: SiteSettings;
  branches: Branch[];
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  settings,
  branches,
  onOpenLegal,
}) => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Institute Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight font-brand">
                ADVANCE <span className="text-amber-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students, professionals, and aspiring educators across Najafgarh with real, job-oriented technical, computing, accounting, and higher education guidance.
            </p>
            <div className="pt-2 space-y-2">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2.5 text-white hover:text-amber-400 font-bold text-sm transition-colors"
              >
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 {settings.phone}</span>
              </a>

              {settings.isWhatsAppEnabled && (
                <a
                  href={`https://wa.me/91${settings.phone}?text=${encodeURIComponent(
                    'Hello Advance AI Institute, please share admission details.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors"
                >
                  <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span>WhatsApp Chat Support</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Quick Navigation</span>
              <span className="w-8 h-0.5 bg-amber-500"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  All Courses & Certifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('branches')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  Our 3 Najafgarh Branches
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admissions')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  Admissions & Scholarships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  About Our Pedagogy & Labs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" />
                  Contact & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* 3 Physical Branches Overview */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>Our Najafgarh Branches</span>
              <span className="w-8 h-0.5 bg-amber-500"></span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {branches.slice(0, 3).map((branch, index) => (
                <div
                  key={branch.id || index}
                  className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-colors space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{branch.name.split('-')[0].trim()}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                      {branch.address}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Call: {branch.phone}</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        branch.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-0.5"
                      title="Open Google Maps direction"
                    >
                      <span>Map</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200">Class Hours:</strong> Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: Special Doubt Clearing & Practical Lab Slots Available.
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & University Transparency Notice */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Educational Guidance & Statutory Transparency Notice</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Advance AI Institute is a private vocational training, software education, and academic consultation center. Vocational certifications and computer diplomas are awarded based on institutional curriculum assessment. For academic degrees (such as B.Ed, JBT, BA, B.Com, MA, M.Com), Advance AI Institute provides educational counseling, study coordination, and student assistance; degrees and formal enrollments are conferred strictly by respective UGC, DEB, and NCTE recognized universities and examining bodies. No unauthorized affiliation or autonomous degree granting is claimed.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Advance AI Institute. All rights reserved. Najafgarh, New Delhi.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-amber-400 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-amber-400 transition-colors"
            >
              Reach Us
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
