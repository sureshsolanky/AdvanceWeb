import React from 'react';
import { Clock, Award, MapPin, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
  onEnquireCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
  onEnquireCourse,
}) => {
  const hasDiscount = course.discount > 0;
  const calculatedFinalFee = hasDiscount
    ? Math.round(course.fee * (1 - course.discount / 100))
    : course.fee;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-amber-400/50">
      {/* Card Header & Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
          alt={course.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[#0A192F]/90 text-amber-300 text-[11px] font-bold tracking-wide uppercase backdrop-blur-xs border border-amber-500/30">
            {course.category}
          </span>

          <div className="flex items-center gap-1.5">
            {course.isExample && (
              <span className="px-2 py-0.5 rounded-sm bg-slate-800/90 text-slate-300 text-[10px] font-medium border border-slate-700">
                Example Course
              </span>
            )}
            {hasDiscount && (
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-black shadow-md flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {course.discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Bottom Duration Badge on Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{course.duration}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3
            onClick={() => onSelectCourse(course)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {course.name}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* Eligibility Note */}
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
            <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">
              <strong>Eligibility:</strong> {course.eligibility}
            </span>
          </div>

          {/* Branch Availability Tags */}
          <div className="flex flex-wrap items-center gap-1 pt-1">
            <MapPin className="w-3 h-3 text-amber-600 shrink-0 mr-0.5" />
            {course.branchAvailability && course.branchAvailability.length > 0 ? (
              course.branchAvailability.map((branch, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded-sm text-[10px] font-medium"
                >
                  {branch.replace('Campus', '').replace('Center', '').replace('Branch', '').trim()}
                </span>
              ))
            ) : (
              <span className="text-[10px] text-slate-400">All Najafgarh Branches</span>
            )}
          </div>
        </div>

        {/* Fee & Action Block */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">Course Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-[#0A192F]">
                  ₹{calculatedFinalFee.toLocaleString('en-IN')}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-slate-400 line-through font-medium">
                    ₹{course.fee.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
              Certificate Included
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onSelectCourse(course)}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors text-center"
            >
              View Syllabus
            </button>
            <button
              onClick={() => onEnquireCourse(course)}
              className="w-full py-2 px-3 rounded-lg bg-[#0A192F] hover:bg-blue-900 text-amber-400 hover:text-amber-300 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1"
            >
              <span>Enquire</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
