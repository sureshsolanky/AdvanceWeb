import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  FileCheck,
  Tag,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  Send,
  AlertCircle
} from 'lucide-react';
import { Course, Branch, SiteSettings } from '../types';
import { submitEnquiry } from '../services/enquiryService';
import { useAuth } from '../context/AuthContext';

interface AdmissionsViewProps {
  courses: Course[];
  branches: Branch[];
  settings: SiteSettings;
  onEnquirySuccess?: () => void;
}

export const AdmissionsView: React.FC<AdmissionsViewProps> = ({
  courses,
  branches,
  settings,
  onEnquirySuccess,
}) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.name || '');
  const [preferredBranch, setPreferredBranch] = useState(branches[0]?.name || '');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full student name.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit mobile contact number.');
      return;
    }

    try {
      setLoading(true);
      const id = await submitEnquiry({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        selectedCourse,
        preferredBranch,
        message: message.trim() || undefined,
      });

      setSuccessId(id);
      if (onEnquirySuccess) onEnquirySuccess();
    } catch (err: any) {
      setError(err.message || 'Error submitting application. Please call 8700573469 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
          Admissions 2026 Session
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-brand">
          Apply for Admission & Free Demo Class
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Enroll in our cutting-edge AI, programming, Tally Prime, ADCA diploma, or teacher counseling courses. Transparent fee structure with active 10%–50% merit concessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Admissions Guide & Document Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* Concession Notice */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-100" />
              <h3 className="font-extrabold text-base font-brand">Scholarship & Fee Concessions</h3>
            </div>
            <p className="text-xs text-amber-50 leading-relaxed">
              We offer between <strong>10% and 50% discount</strong> on selected courses and diplomas for:
            </p>
            <ul className="text-xs text-amber-100 space-y-1.5 list-disc pl-4">
              <li>Early-bird registration for new batches</li>
              <li>Merit concession for high performers (Class 10th / 12th)</li>
              <li>Women in Tech & NTT/B.Ed Teacher Training subsidy</li>
              <li>Full upfront annual diploma fee payment</li>
            </ul>
          </div>

          {/* Documents Required */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-800" />
              <span>Documents Required for Final Enrollment</span>
            </h3>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Copy of Aadhaar Card / Government Photo Identity Proof</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>2 Passport-size colored photographs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Marksheet copy of highest completed qualification (10th, 12th, or Graduation)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Admission registration fee receipt from your branch</span>
              </li>
            </ul>
          </div>

          {/* Quick Help Contacts */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-800 block">Need Instant Admission Advice?</span>
            <p className="text-slate-600">
              Speak directly with our senior admission director at <strong>8700573469</strong> or message on WhatsApp.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href={`tel:${settings.phone}`} className="font-bold text-blue-900 hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>Call {settings.phone}</span>
              </a>
              {settings.isWhatsAppEnabled && (
                <a href={`https://wa.me/91${settings.phone}`} className="font-bold text-emerald-700 hover:underline flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Embedded Admission Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-[#0A192F] text-white p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold font-brand">Online Admission & Demo Booking</h2>
            <p className="text-xs text-slate-300 mt-1">
              Submit this verified form to secure your seat and lock in active promotional fee discounts.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {successId ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
                <p className="text-xs text-slate-500 font-mono">Reference No: {successId}</p>
                <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  Welcome to Advance AI Institute! We have reserved your provisional seat for <strong>{selectedCourse}</strong> at <strong>{preferredBranch}</strong>. Our admissions officer will contact <strong>+91 {phone}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSuccessId(null);
                    setPhone('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your legal full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Mobile Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-medium">+91</span>
                      <input
                        type="tel"
                        required
                        placeholder="10 digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Career Course / Diploma <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-semibold"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.duration} - Fee: ₹{c.finalFee})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Najafgarh Campus <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={preferredBranch}
                    onChange={(e) => setPreferredBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-semibold"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} ({b.locality || b.landmark})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message / Timing preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Additional Queries / Preferred Slot <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    maxLength={1000}
                    placeholder="e.g. Inquire about morning batches, hostel information, or weekend classes..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting Application...' : 'Confirm Admission Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
