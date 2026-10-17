import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { Branch, SiteSettings, Course } from '../types';
import { submitEnquiry } from '../services/enquiryService';

interface ContactViewProps {
  branches: Branch[];
  settings: SiteSettings;
  courses: Course[];
}

export const ContactView: React.FC<ContactViewProps> = ({
  branches,
  settings,
  courses,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.name || 'General Inquiry');
  const [preferredBranch, setPreferredBranch] = useState(branches[0]?.name || 'Branch 1 - Maksudabad Campus');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit mobile contact number.');
      return;
    }

    try {
      setLoading(true);
      await submitEnquiry({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        selectedCourse,
        preferredBranch,
        message: message.trim() || undefined,
      });

      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Submission error. Please call 8700573469 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5 text-blue-800" />
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-brand">
          Contact Advance AI Institute
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Reach our academic advisors by direct phone, WhatsApp chat, or walk directly into any of our 3 branches in Najafgarh, New Delhi.
        </p>
      </div>

      {/* Primary Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Telephone Call Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
            <Phone className="w-6 h-6 text-blue-800" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct Helpline</span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">+91 {settings.phone}</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instant telephonic admission consultation and inquiry support available 8 AM to 8 PM Monday to Saturday.
          </p>
          <a
            href={`tel:${settings.phone}`}
            className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-blue-900 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Click to Call Now</span>
          </a>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-emerald-400 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Support</span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">+91 {settings.phone}</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {settings.isWhatsAppEnabled
              ? 'Receive syllabus PDFs, batch timings, and fee concession vouchers instantly on your phone.'
              : 'WhatsApp support currently offline. Please dial direct phone helpline.'}
          </p>
          {settings.isWhatsAppEnabled && (
            <a
              href={`https://wa.me/91${settings.phone}?text=${encodeURIComponent(
                'Hello Advance AI Institute, please send me course and admission details.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat</span>
            </a>
          )}
        </div>

        {/* Center Timings Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-amber-400 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Working Hours</span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">8:00 AM – 8:00 PM</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Monday through Saturday: Active lecture batches & practical labs. Sunday: Special lab slots & admissions desk.
          </p>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-semibold text-center border border-amber-200/60">
            All 3 Najafgarh Branches Open Today
          </div>
        </div>
      </div>

      {/* Interactive Form & Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-brand">Send Us an Inquiry</h2>
          <p className="text-xs text-slate-600">
            Submit your query below. Our counselor will revert with course brochures and batch availability.
          </p>

          {success ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-950">Thank you for writing to us!</h4>
              <p className="text-xs text-emerald-800">
                Your message has been sent directly to the admissions team. We will call you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-2 bg-[#0A192F] text-white rounded-xl text-xs font-bold"
              >
                Send Another Message
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10 digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                  />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Interested Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
                  >
                    <option value="General Inquiry">General Course Inquiry</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Branch</label>
                  <select
                    value={preferredBranch}
                    onChange={(e) => setPreferredBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Question / Message</label>
                <textarea
                  rows={3}
                  maxLength={1000}
                  placeholder="How can our admissions team assist you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* 3 Physical Branches Guide */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 font-brand">Campus Directory & Addresses</h2>
          <div className="space-y-3">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#0A192F] text-amber-400 font-bold text-xs">
                    {branch.name.split('-')[0].trim()}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{branch.plotNo}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{branch.name}</h3>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {branch.address}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-600 font-medium">
                    Landmark: <strong className="text-slate-800">{branch.landmark}</strong>
                  </span>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      branch.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
