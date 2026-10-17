import React from 'react';
import { X, Clock, Award, CheckCircle, Tag, MapPin, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (course: Course) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onApply,
}) => {
  if (!course) return null;

  const hasDiscount = course.discount > 0;
  const calculatedFinalFee = hasDiscount
    ? Math.round(course.fee * (1 - course.discount / 100))
    : course.fee;
  const savings = course.fee - calculatedFinalFee;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-scaleUp">
        {/* Modal Header */}
        <div className="relative bg-[#0A192F] text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-sm bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                {course.category}
              </span>
              {course.isExample && (
                <span className="px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300 text-xs">
                  Example Course (Admin Editable)
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-brand">
              {course.name}
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {course.description}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Duration</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{course.duration}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Eligibility</span>
              <div className="flex items-center gap-1 font-bold text-slate-800 mt-0.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span className="truncate">{course.eligibility}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Course Fee</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-base font-extrabold text-[#0A192F]">
                  ₹{calculatedFinalFee.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{course.fee.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Discount</span>
              <div className="mt-0.5">
                {hasDiscount ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 font-bold text-xs">
                    <Tag className="w-3 h-3" />
                    Save {course.discount}% (₹{savings})
                  </span>
                ) : (
                  <span className="text-slate-500 font-medium">Standard Fee</span>
                )}
              </div>
            </div>
          </div>

          {/* Syllabus Curriculum */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Curriculum & Learning Modules</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.syllabus.map((topic, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5 shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Branch Availability */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Available Training Branches</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.branchAvailability && course.branchAvailability.length > 0 ? (
                course.branchAvailability.map((branch, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>{branch}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Available across all 3 Najafgarh branches.</p>
              )}
            </div>
          </div>

          {/* Admission Notes / Verification Disclaimer */}
          {course.admissionNotes && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1 text-xs text-amber-900">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Important Admission & Certification Note:</span>
              </div>
              <p className="leading-relaxed text-slate-700">
                {course.admissionNotes}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs text-slate-500 block">Need a free trial or batch timing guidance?</span>
            <span className="text-sm font-bold text-slate-800">Call 8700573469 for free counseling</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(course);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 w-1/2 sm:w-auto"
            >
              <span>Apply for this Course</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
