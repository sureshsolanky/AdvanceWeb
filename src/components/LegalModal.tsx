import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-scaleUp">
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            ) : (
              <FileText className="w-5 h-5 text-amber-400" />
            )}
            <h2 className="text-xl font-bold font-brand text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto text-xs text-slate-700 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Effective Date:</strong> January 1, 2026. Advance AI Institute respects your personal privacy. This Privacy Policy details how we handle student information across our website and 3 physical branches in Najafgarh, New Delhi.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">1. Information Collection</h4>
              <p>
                We only collect information voluntarily submitted through our admission forms, inquiries, and telephone consultations, such as student full name, contact phone number, email address, preferred study program, and selected branch location.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">2. Use of Information</h4>
              <p>
                Your contact details are strictly utilized to provide academic counseling, arrange batch schedules, issue identity documents, and coordinate course enrollment. We never sell, lease, or distribute student contact data to third-party telemarketers.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">3. Data Security & Storage</h4>
              <p>
                Student inquiries are securely persisted in encrypted Google Cloud Firestore databases adhering to zero-trust attribute-based access controls. Only authorized administrative personnel have access to enquiry records.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">4. Your Rights</h4>
              <p>
                Students may request to inspect, rectify, or purge their inquiry records at any time by contacting our administrative desk at <strong>8700573469</strong> or visiting any of our 3 Najafgarh campus locations.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Advance AI Institute Enrollment & Institutional Terms</strong>
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">1. Scope of Programs</h4>
              <p>
                Advance AI Institute provides industry-grade training in software engineering, AI productivity, computerized accounting, graphic design, and vocational computer diplomas (ADCA, DCA, PGDCA). Certifications for these technical programs are evaluated and conferred on practical project completion.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">2. University Correspondence Disclaimer</h4>
              <p>
                For university correspondence programs (including B.Ed, JBT / D.El.Ed, NTT, BA, B.Com, MA, M.Com), Advance AI Institute acts solely as a student counseling, study guidance, and tutorial support center. Formal degree awards and university enrollments are governed by the respective UGC/NCTE-approved universities and regulatory bodies. Advance AI Institute does not represent itself as an autonomous degree-granting university.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">3. Fees & Promotional Scholarships</h4>
              <p>
                All discounts (between 10% and 50%) are promotional fee concessions offered at the discretion of institute management for early registration, academic merit, or seasonal schemes. Fees once deposited are non-refundable after commencement of classroom sessions except as explicitly authorized in writing.
              </p>
              <h4 className="text-sm font-bold text-slate-900 pt-2">4. Code of Conduct & Lab Discipline</h4>
              <p>
                Students must maintain punctuality, lab equipment hygiene, and respect peer learning environments across our Maksudabad, Khera More, and Gupta Market centers.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0A192F] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
