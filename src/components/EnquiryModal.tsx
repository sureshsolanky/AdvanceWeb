import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, Sparkles } from 'lucide-react';
import { Course, Branch } from '../types';
import { submitEnquiry } from '../services/enquiryService';
import { useAuth } from '../context/AuthContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseName?: string;
  courses: Course[];
  branches: Branch[];
  onSuccess?: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseName,
  courses,
  branches,
  onSuccess,
}) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [preferredBranch, setPreferredBranch] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccessId(null);
      if (preselectedCourseName) {
        setSelectedCourse(preselectedCourseName);
      } else if (courses.length > 0 && !selectedCourse) {
        setSelectedCourse(courses[0].name);
      }
      if (branches.length > 0 && !preferredBranch) {
        setPreferredBranch(branches[0].name);
      }
      if (currentUser) {
        if (currentUser.displayName && !name) setName(currentUser.displayName);
        if (currentUser.email && !email) setEmail(currentUser.email);
      }
    }
  }, [isOpen, preselectedCourseName, courses, branches, currentUser]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit mobile phone number.');
      return;
    }

    if (!selectedCourse) {
      setError('Please select a course.');
      return;
    }

    if (!preferredBranch) {
      setError('Please select a preferred Najafgarh branch.');
      return;
    }

    try {
      setLoading(true);
      const enqId = await submitEnquiry({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        selectedCourse,
        preferredBranch,
        message: message.trim() || undefined,
      });

      setSuccessId(enqId);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Unable to submit enquiry right now. Please try calling 8700573469 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSuccessId(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions & Counseling Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-brand">
            Student Admission & Free Demo Class
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Fill in your details below. Our academic counselor will call you back within 2 working hours.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {successId ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Reference ID: <span className="font-mono font-bold text-blue-900">{successId}</span>
                </p>
              </div>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                Thank you, <strong>{name}</strong>! We have received your interest for <strong>{selectedCourse}</strong> at <strong>{preferredBranch}</strong>. Our faculty will reach out to <strong>+91 {phone}</strong> shortly.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-[#0A192F] text-amber-400 hover:text-amber-300 text-xs font-bold transition-all"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student / Aspirant Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
                />
              </div>

              {/* Contact Numbers & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-medium">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="10 digit number"
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
                  Interested Course / Program <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
                >
                  <option value="" disabled>Select a course...</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.duration} - {c.discount > 0 ? `${c.discount}% Off` : `₹${c.fee}`})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Branch */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Najafgarh Branch <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={preferredBranch}
                  onChange={(e) => setPreferredBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 font-medium"
                >
                  <option value="" disabled>Choose your branch...</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name} ({b.locality || b.landmark})
                    </option>
                  ))}
                </select>
              </div>

              {/* Message / Query */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Questions or Preferred Batch Timings <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  maxLength={1000}
                  placeholder="e.g. Interested in morning 9 AM batch or weekend classes..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900 resize-none"
                />
              </div>

              {/* Direct Call Assistance info */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Phone className="w-3 h-3 text-amber-500" />
                  Instant Helpline: 8700573469
                </span>
                <span>Demo class is 100% free</span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
