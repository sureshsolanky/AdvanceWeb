import React from 'react';
import { Award, Cpu, BookOpen, Users, CheckCircle2, ShieldCheck, MapPin, Building, Target } from 'lucide-react';
import { PageView } from '../types';

interface AboutViewProps {
  onNavigate: (page: PageView) => void;
  onOpenEnquiry: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Headline */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Building className="w-3.5 h-3.5 text-blue-800" />
          About Advance AI Institute
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-brand leading-tight">
          Pioneering IT, AI & Career Education in Najafgarh
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
          Founded with a clear commitment: to replace passive theoretical rote learning with active, project-driven technological skill building and verified academic pathways.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
            <Target className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-brand">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To provide accessible, high-caliber computer programming, artificial intelligence workflows, computerized accounting, and teacher training guidance across Najafgarh and rural/semi-urban Delhi-NCR. We bridge the critical gap between academic schooling and industry job requirements.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
            <Award className="w-6 h-6 text-blue-800" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-brand">Our Pedagogical Standard</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            100% Practical lab time. Every student is allocated a dedicated workstation. Instructors conduct real-time code reviews, balance sheet audits in Tally Prime, and live generative AI prompt evaluations rather than reading from static textbooks.
          </p>
        </div>
      </div>

      {/* 3 Specialized Centers Overview */}
      <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Campus Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-brand">
            Specialized Najafgarh Learning Hubs
          </h2>
          <p className="text-xs text-slate-300">
            Each branch is customized with dedicated lab facilities for specific domain requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-amber-400 font-bold text-sm">Branch 1: Maksudabad</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Main administrative campus near Nangloi Stand opposite Bank of Baroda. Features AI & Data Science workstations, high-speed fiber internet, and executive lecture rooms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-amber-400 font-bold text-sm">Branch 2: Khera More</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Situated above Bio Science Lab at Khera More. Specialized media suites for Adobe Premiere Pro video editing, Graphic Design Pro, and computerized commercial accounting in Tally.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-amber-400 font-bold text-sm">Branch 3: Gupta Market</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conveniently located opposite Gupta Market. Dedicated counseling center for Teacher Training (B.Ed, JBT/D.El.Ed, NTT) and University Correspondence Degree programs.
            </p>
          </div>
        </div>
      </div>

      {/* Statutory Integrity & Academic Ethics */}
      <div className="p-6 sm:p-8 bg-amber-50/70 border border-amber-200 rounded-3xl space-y-3">
        <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base font-brand">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Commitment to Transparency & Educational Integrity</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          At Advance AI Institute, we strictly uphold ethical counseling principles. We never invent university affiliations, fake government recognitions, or misleading accreditations. For academic degree programs, we provide legitimate counseling and study assistance for programs conferred by recognized UGC, DEB, and NCTE accredited universities.
        </p>
      </div>

      {/* CTA Strip */}
      <div className="text-center pt-4">
        <button
          onClick={onOpenEnquiry}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
        >
          Book a Campus Visit & Counselor Meeting
        </button>
      </div>
    </div>
  );
};
