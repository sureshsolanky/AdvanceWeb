import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, BookOpen, MapPin, Tag } from 'lucide-react';
import { Course, Branch, CourseCategory } from '../types';
import { CourseCard } from '../components/CourseCard';
import { CATEGORIES } from '../data/seedData';

interface CoursesViewProps {
  courses: Course[];
  branches: Branch[];
  onSelectCourse: (course: Course) => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  branches,
  onSelectCourse,
  onOpenEnquiry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'fee-asc' | 'fee-desc' | 'discount'>('featured');

  const filteredAndSortedCourses = useMemo(() => {
    return courses
      .filter((c) => {
        // Search filter
        const matchesSearch =
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

        // Branch filter
        const matchesBranch =
          selectedBranch === 'All' ||
          !c.branchAvailability ||
          c.branchAvailability.length === 0 ||
          c.branchAvailability.some((b) => b.toLowerCase().includes(selectedBranch.toLowerCase()));

        // Discount filter
        const matchesDiscount = !onlyDiscounted || c.discount > 0;

        return matchesSearch && matchesCategory && matchesBranch && matchesDiscount;
      })
      .sort((a, b) => {
        if (sortBy === 'fee-asc') return a.finalFee - b.finalFee;
        if (sortBy === 'fee-desc') return b.finalFee - a.finalFee;
        if (sortBy === 'discount') return b.discount - a.discount;
        return 0; // featured/default order
      });
  }, [courses, searchTerm, selectedCategory, selectedBranch, onlyDiscounted, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          Academic & Technical Programs
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A192F] font-brand">
          Explore Certified Courses & Diplomas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Search through 20+ career-oriented programs covering Generative AI, Python, Full-Stack Web Development, Tally Prime with GST, ADCA Diplomas, and University Counseling for B.Ed & JBT across our 3 Najafgarh centers.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search courses (e.g. Python, Tally, ADCA, B.Ed, Excel)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-900"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-800 font-medium"
            >
              <option value="All">All Categories ({courses.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Dropdown */}
          <div className="md:col-span-2">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-800 font-medium"
            >
              <option value="All">All Branches</option>
              <option value="Maksudabad">Branch 1 (Maksudabad)</option>
              <option value="Khera More">Branch 2 (Khera More)</option>
              <option value="Gupta Market">Branch 3 (Gupta Market)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-slate-800 font-medium"
            >
              <option value="featured">Sort: Featured</option>
              <option value="discount">Highest Discount</option>
              <option value="fee-asc">Fee: Low to High</option>
              <option value="fee-desc">Fee: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">Active Filter:</span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-md text-slate-800 font-bold">
              Showing {filteredAndSortedCourses.length} of {courses.length} courses
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={(e) => setOnlyDiscounted(e.target.checked)}
              className="rounded-sm text-amber-500 focus:ring-amber-500 h-4 w-4"
            />
            <span className="text-slate-700 font-bold flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              Only Discounted / Scholarship Courses (10% to 50% Off)
            </span>
          </label>
        </div>
      </div>

      {/* Course Grid */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No courses match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or selecting "All Categories" to view all available programs.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedBranch('All');
              setOnlyDiscounted(false);
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelectCourse={onSelectCourse}
              onEnquireCourse={(c) => onOpenEnquiry(c.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
