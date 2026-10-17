import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Phone,
  MessageCircle,
  Calendar,
  Sparkles,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { Enquiry, SiteSettings, PageView } from '../types';
import { getStudentEnquiries } from '../services/enquiryService';
import { useAuth } from '../context/AuthContext';

interface StudentPortalViewProps {
  settings: SiteSettings;
  onNavigate: (page: PageView) => void;
  onOpenEnquiry: () => void;
}

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({
  settings,
  onNavigate,
  onOpenEnquiry,
}) => {
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      setError(null);
      const list = await getStudentEnquiries(currentUser.uid);
      setEnquiries(list);
    } catch (err: any) {
      console.error('Error loading student records:', err);
      setError('Unable to load your application records right now. Please try again or call 8700573469.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchEnquiries();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto shadow-xs">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] font-brand">
            Student Portal Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Sign in with your Google account to track your submitted course inquiries, admission status, and counselor feedback in real-time.
          </p>
        </div>

        <button
          onClick={loginWithGoogle}
          className="px-8 py-3.5 rounded-xl bg-[#0A192F] hover:bg-blue-900 text-amber-400 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <User className="w-4 h-4" />
          <span>Sign In with Google</span>
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-[11px]">Under Review (New)</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">Counselor Contacted</span>;
      case 'Follow-up':
        return <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 font-bold text-[11px]">Follow-Up Scheduled</span>;
      case 'Converted':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">Seat Confirmed / Enrolled</span>;
      case 'Archived':
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">Archived</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#1E3A8A] text-amber-400 flex items-center justify-center text-2xl font-bold shadow-md">
            {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-brand">
                {currentUser.displayName || 'Student Aspirant'}
              </h1>
              <span className="px-2 py-0.5 rounded-sm bg-blue-100 text-blue-900 text-[10px] font-bold">
                Student Account
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Refresh applications"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-xs transition-all"
          >
            New Application
          </button>

          <button
            onClick={logout}
            className="p-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>My Submitted Enquiries & Admission Applications ({enquiries.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Live Status from Najafgarh Admissions Desk</span>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {enquiries.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No applications on file yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You haven't submitted any course applications under this email address yet. Apply for a program to view your counselor updates here.
              </p>
            </div>
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs uppercase"
            >
              Apply for a Course Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">ID: {enq.id}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{enq.selectedCourse}</h3>
                  </div>
                  {getStatusBadge(enq.status)}
                </div>

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span>Preferred Branch:</span>
                    <strong className="text-slate-800">{enq.preferredBranch}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Contact Number:</span>
                    <strong className="text-slate-800">+91 {enq.phone}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Application Date:</span>
                    <span className="text-slate-700 font-medium">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {enq.adminNotes && (
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1 text-xs">
                    <span className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                      <span>Counselor Update:</span>
                    </span>
                    <p className="text-slate-700 leading-relaxed">{enq.adminNotes}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Need immediate help?</span>
                  <a
                    href={`tel:${settings.phone}`}
                    className="font-bold text-blue-900 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-amber-500" />
                    <span>Call 8700573469</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
