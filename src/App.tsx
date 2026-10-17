import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { EnquiryModal } from './components/EnquiryModal';
import { LegalModal } from './components/LegalModal';

import { HomeView } from './views/HomeView';
import { CoursesView } from './views/CoursesView';
import { BranchesView } from './views/BranchesView';
import { AdmissionsView } from './views/AdmissionsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { StudentPortalView } from './views/StudentPortalView';
import { AdminPortalView } from './views/AdminPortalView';

import { Course, Branch, Offer, SiteSettings, PageView } from './types';
import { getCourses } from './services/courseService';
import { getBranches } from './services/branchService';
import { getOffers } from './services/offerService';
import { getSiteSettings } from './services/settingsService';
import { INITIAL_BRANCHES, INITIAL_OFFERS, INITIAL_SETTINGS, INITIAL_COURSES } from './data/seedData';
import { Phone, MessageCircle } from 'lucide-react';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [offers, setOffers] = useState<Offer[]>(INITIAL_OFFERS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryPreselectedCourse, setEnquiryPreselectedCourse] = useState<string | undefined>();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const loadAllData = async () => {
    try {
      const [fetchedCourses, fetchedBranches, fetchedOffers, fetchedSettings] = await Promise.all([
        getCourses(),
        getBranches(),
        getOffers(),
        getSiteSettings(),
      ]);
      setCourses(fetchedCourses);
      setBranches(fetchedBranches);
      setOffers(fetchedOffers);
      setSettings(fetchedSettings);
    } catch (err) {
      console.warn('Initial data load notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiryModal = (courseName?: string) => {
    setEnquiryPreselectedCourse(courseName);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        settings={settings}
        onOpenEnquiryModal={handleOpenEnquiryModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            courses={courses}
            branches={branches}
            offers={offers}
            settings={settings}
            onNavigate={handleNavigate}
            onSelectCourse={(course) => setSelectedCourseForModal(course)}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentPage === 'courses' && (
          <CoursesView
            courses={courses}
            branches={branches}
            onSelectCourse={(course) => setSelectedCourseForModal(course)}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentPage === 'branches' && (
          <BranchesView
            branches={branches}
            settings={settings}
            onOpenEnquiry={handleOpenEnquiryModal}
          />
        )}

        {currentPage === 'admissions' && (
          <AdmissionsView
            courses={courses}
            branches={branches}
            settings={settings}
            onEnquirySuccess={() => {}}
          />
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenEnquiry={() => handleOpenEnquiryModal()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            branches={branches}
            settings={settings}
            courses={courses}
          />
        )}

        {currentPage === 'student-portal' && (
          <StudentPortalView
            settings={settings}
            onNavigate={handleNavigate}
            onOpenEnquiry={() => handleOpenEnquiryModal()}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPortalView
            courses={courses}
            branches={branches}
            offers={offers}
            settings={settings}
            onRefreshAllData={loadAllData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        settings={settings}
        branches={branches}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Modals */}
      <CourseModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onApply={(course) => {
          setSelectedCourseForModal(null);
          handleOpenEnquiryModal(course.name);
        }}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        preselectedCourseName={enquiryPreselectedCourse}
        courses={courses}
        branches={branches}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Floating Action Buttons for Mobile Users */}
      <div className="fixed bottom-4 right-4 z-30 sm:hidden flex flex-col gap-2">
        {settings.isWhatsAppEnabled && (
          <a
            href={`https://wa.me/91${settings.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg active:scale-95"
            aria-label="WhatsApp Chat"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        )}
        <a
          href={`tel:${settings.phone}`}
          className="w-12 h-12 rounded-full bg-[#0A192F] text-amber-400 flex items-center justify-center shadow-lg border border-amber-400/30 active:scale-95"
          aria-label="Direct Phone Call"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
