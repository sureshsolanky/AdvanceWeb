import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink, CheckCircle2, Navigation, Building2 } from 'lucide-react';
import { Branch, SiteSettings } from '../types';

interface BranchesViewProps {
  branches: Branch[];
  settings: SiteSettings;
  onOpenEnquiry: (courseOrBranch?: string) => void;
}

export const BranchesView: React.FC<BranchesViewProps> = ({
  branches,
  settings,
  onOpenEnquiry,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-blue-800" />
          Physical Training Campuses
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-brand">
          Visit Our 3 Najafgarh Branches
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Advance AI Institute is conveniently accessible from all parts of Najafgarh, Nangloi Stand, and surrounding Delhi-NCR localities. Walk in for admissions counseling or lab tours.
        </p>
      </div>

      {/* Branches Detailed Cards */}
      <div className="space-y-8">
        {branches.map((branch, idx) => (
          <div
            key={branch.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Branch Meta */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#0A192F] text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                    {branch.name.split('-')[0].trim()}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">
                    {branch.plotNo}
                  </span>
                  {branch.id === 'branch-3-gupta-market' && (
                    <span className="px-2.5 py-0.5 rounded-sm bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-medium">
                      Admin Locality Customizable
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 font-brand">
                  {branch.name}
                </h2>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2.5 text-xs text-slate-800">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 text-sm">Official Address:</strong>
                      <span className="text-xs text-slate-700 leading-relaxed font-medium">
                        {branch.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1 border-t border-slate-200/80">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span><strong>Landmark:</strong> {branch.landmark}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Center Timings</span>
                      <span className="font-semibold text-slate-800">{branch.timing}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Direct Desk</span>
                      <a href={`tel:${branch.phone}`} className="font-bold text-slate-900 hover:text-blue-900">
                        +91 {branch.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {branch.notes && (
                  <p className="text-xs text-slate-500 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100">
                    📌 {branch.notes}
                  </p>
                )}
              </div>

              {/* Right: Facilities & Actions */}
              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Campus Facilities & Labs
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {branch.facilities && branch.facilities.map((fac, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      branch.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                  >
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <button
                    onClick={() => onOpenEnquiry(`Visit / Admission at ${branch.name}`)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0A192F] hover:bg-blue-900 text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>Schedule Free Visit / Counseling</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Central Consultation Box */}
      <div className="bg-[#0A192F] text-white p-8 rounded-3xl border border-slate-800 text-center max-w-3xl mx-auto space-y-4">
        <h3 className="text-xl font-bold font-brand">Need help finding the nearest branch?</h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
          Call our central helpline <strong>8700573469</strong> or message us on WhatsApp. Our coordinators will guide you with landmark directions, bus routes, and parking details.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <a
            href={`tel:${settings.phone}`}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase hover:bg-amber-600 transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Call {settings.phone}</span>
          </a>
          {settings.isWhatsAppEnabled && (
            <a
              href={`https://wa.me/91${settings.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
