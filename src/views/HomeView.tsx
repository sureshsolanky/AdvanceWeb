import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  MessageCircle,
  GraduationCap,
  Award,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  Cpu,
  BookOpen,
  Users,
  Compass,
  Briefcase,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Course, Branch, Offer, SiteSettings, PageView, CourseCategory } from '../types';
import { CourseCard } from '../components/CourseCard';
import { CATEGORIES } from '../data/seedData';

interface HomeViewProps {
  courses: Course[];
  branches: Branch[];
  offers: Offer[];
  settings: SiteSettings;
  onNavigate: (page: PageView) => void;
  onSelectCourse: (course: Course) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  courses,
  branches,
  offers,
  settings,
  onNavigate,
  onSelectCourse,
  onOpenEnquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredCourses = selectedCategory === 'All'
    ? courses.slice(0, 8)
    : courses.filter(c => c.category === selectedCategory).slice(0, 8);

  const faqs = [
    {
      q: 'Where are the 3 branches of Advance AI Institute located in Najafgarh?',
      a: 'We operate three well-equipped study branches in Najafgarh: Branch 1 at Plot No. 48, Maksudabad (opposite Bank of Baroda, Nangloi Stand); Branch 2 at Plot No. 34, Khera More (above Bio Science Lab); and Branch 3 at Plot No. 1, opposite Gupta Market. Students can select their most convenient center.'
    },
    {
      q: 'Are certificates provided upon course completion?',
      a: 'Yes. For all computer courses, ADCA, DCA, Tally Prime, Full Stack, and AI programs, students receive an institutional certificate of completion following practical assessment. For university correspondence programs (such as B.Ed, JBT, BA, B.Com), degrees are awarded directly by the respective recognized universities.'
    },
    {
      q: 'Can I take a free demo class before enrolling?',
      a: 'Yes, absolutely. We offer 1-2 free trial classes for any programming, AI, accounting, or computer course so you can evaluate the teacher and practical lab environment before paying any fees.'
    },
    {
      q: 'What batch timings are available?',
      a: 'We offer flexible batches from 8:00 AM to 8:00 PM Monday through Saturday. Special morning, evening, and weekend batches are available for working professionals and college students.'
    },
    {
      q: 'What discount or scholarship schemes are currently active?',
      a: 'We offer genuine fee concessions between 10% and 50% for early-bird admissions, women in technology/teacher training, and students enrolling for full-year professional diplomas (ADCA).'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0A192F] via-[#0F1E36] to-[#0A192F] text-white pt-16 pb-24 overflow-hidden border-b border-amber-500/20">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Premier IT, AI & Computer Academy in Najafgarh</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-brand">
                Master Practical <span className="text-amber-400">AI</span>, Coding & Professional Skills.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Advance AI Institute provides industry-aligned training across <strong>3 Najafgarh branches</strong>. Learn Generative AI, Full-Stack Web Dev, Python, Advanced Excel, Tally Prime with GST, ADCA Diplomas, and University Counseling for B.Ed & JBT.
              </p>

              {/* Quick Key Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="text-amber-400 font-extrabold text-lg">3 Centers</div>
                  <div className="text-slate-300 text-xs">Maksudabad • Khera More • Gupta Market</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="text-amber-400 font-extrabold text-lg">100% Practical</div>
                  <div className="text-slate-300 text-xs">Hands-on Lab Assignments</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <div className="text-amber-400 font-extrabold text-lg">10% - 50% Off</div>
                  <div className="text-slate-300 text-xs">Admission Concessions</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 justify-center lg:justify-start">
                <button
                  onClick={() => onOpenEnquiry()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book Free Demo Class</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('courses')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors text-center"
                >
                  Explore 20+ Courses
                </button>

                <a
                  href={`tel:${settings.phone}`}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-amber-500/40 hover:bg-amber-500/10 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Feature Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-6 bg-gradient-to-br from-[#112240] to-[#0A192F] border border-amber-500/30 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Admissions Desk Live
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-semibold">Najafgarh, Delhi</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Latest AI & Tech Curriculum</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Hands-on training in Generative AI, ChatGPT workflows, Python Data Science, and modern Web Stacks.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Commercial Accounting & GST</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Tally Prime, E-way billing, live company balance sheets, and Advanced Excel dashboards.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                    <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Teaching & Degree Guidance</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Counseling for B.Ed, JBT/D.El.Ed, NTT, and University distance degree programs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instant Quick Direct Connect */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2">
                  <span className="text-xs text-amber-300 font-semibold block">Need advice on choosing the right course?</span>
                  <div className="flex items-center justify-center gap-4 text-xs font-bold">
                    <a href={`tel:${settings.phone}`} className="text-white hover:text-amber-400 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{settings.phone}</span>
                    </a>
                    {settings.isWhatsAppEnabled && (
                      <a
                        href={`https://wa.me/91${settings.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Chat</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Physical Branches Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>Convenient Campus Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-brand">
            3 High-Tech Branches in Najafgarh
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Choose the center closest to your home or college. All centers are equipped with air-conditioned computer labs and certified trainers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch, index) => (
            <div
              key={branch.id || index}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:border-amber-400/50"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-[#0A192F] text-amber-400 text-xs font-bold uppercase">
                    {branch.name.split('-')[0].trim()}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{branch.plotNo}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {branch.name}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {branch.address}
                </p>

                <div className="text-xs text-slate-600 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{branch.timing || '8:00 AM - 8:00 PM'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-blue-900 font-semibold">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {/* Key Facilities */}
                {branch.facilities && branch.facilities.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Facilities:</span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {branch.facilities.slice(0, 3).map((fac, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    branch.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={() => onOpenEnquiry(`Admission Inquiry for ${branch.name}`)}
                  className="px-3.5 py-2 rounded-lg bg-[#0A192F] hover:bg-blue-900 text-amber-400 text-xs font-bold transition-all shadow-xs"
                >
                  Visit / Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Offers & Scholarships Banner */}
      {offers.filter(o => o.active).length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider inline-block">
                  Limited Period Concessions (10% to 50% Off)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-brand tracking-tight">
                  New Session Student Scholarships & Early-Bird Discounts
                </h2>
                <p className="text-xs sm:text-sm text-amber-50 max-w-2xl leading-relaxed">
                  Save up to 50% on practical certifications and diploma courses. Transparent pricing, installment payment options, and zero hidden charges across all branches.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {offers.filter(o => o.active).slice(0, 2).map((offer) => (
                    <div
                      key={offer.id}
                      className="p-3 bg-black/20 rounded-xl border border-white/20 backdrop-blur-xs text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="truncate">{offer.title}</span>
                        <span className="px-2 py-0.5 bg-white text-slate-950 rounded-sm text-[11px] font-black shrink-0 ml-2">
                          {offer.discountPercentage}% OFF
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-100">{offer.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 text-center lg:text-right">
                <button
                  onClick={() => onOpenEnquiry('Promotional Scholarship Application')}
                  className="px-8 py-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 font-extrabold text-xs uppercase tracking-wider shadow-2xl transition-all"
                >
                  Claim Scholarship Discount
                </button>
                <p className="text-[11px] text-amber-100 mt-2 font-medium">
                  Valid across Maksudabad, Khera More & Gupta Market
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Course Catalogue Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Comprehensive Career Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-brand">
              Popular Courses & Diplomas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Browse industry-verified courses. All courses include live computer lab sessions, expert mentorship, and completion certifications.
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>View Full Catalogue ({courses.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#0A192F] text-amber-400 shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Categories ({courses.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0A192F] text-amber-400 shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              onEnquireCourse={(c) => onOpenEnquiry(c.name)}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Advance AI Institute */}
      <section className="bg-slate-100 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Educational Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-brand">
              Why Students Trust Advance AI Institute
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              No generic theory lectures. We prioritize active code execution, real accounting files, and personalized mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6 text-blue-800" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Modern High-Speed Labs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated PC for every student with updated IDEs, Python, AI software, Tally Prime, and design suites.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Experienced Faculty</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn directly from senior industry professionals and academic counselors with 10+ years of domain tenure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Flexible Batch Timings</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Early morning, afternoon, late evening, and weekend batches tailored to fit school, college, and office routines.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Placement & Interview Prep</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Resume building, portfolio development, practical interview mock questions, and local recruitment connect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Admissions Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Simple Enrollment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-brand">
              4 Steps to Join Advance AI Institute
            </h2>
            <p className="text-xs text-slate-300">
              Clear, transparent admissions without complicated bureaucracy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-sm font-bold text-white">Select Your Program</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore our catalog or speak with our counselor at 8700573469 to choose the best career path.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-sm font-bold text-white">Visit Branch / Book Demo</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Drop in at Maksudabad, Khera More, or Gupta Market for a free trial class and lab tour.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-sm font-bold text-white">Verify Documents & Discount</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Submit basic educational IDs, apply active 10%–50% scholarship concessions, and confirm batch timing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="text-sm font-bold text-white">Begin Practical Classes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive course material, student kit, lab login, and start building hands-on portfolio projects.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Start Admission Process Now
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Have Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-brand">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Clear information about admissions, branch locations, fees, and certificates.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-900 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation & Click-to-Call Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold font-brand">
              Need personalized guidance on career options?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Call our central Najafgarh helpline or visit any of our 3 branches for one-on-one counseling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call {settings.phone}</span>
            </a>

            {settings.isWhatsAppEnabled && (
              <a
                href={`https://wa.me/91${settings.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
