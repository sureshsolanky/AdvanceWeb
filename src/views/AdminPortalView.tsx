import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Building2,
  Tag,
  Settings,
  History,
  Plus,
  Edit2,
  Trash2,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  RefreshCw,
  X,
  ExternalLink,
  ChevronRight,
  Database,
  Lock
} from 'lucide-react';
import {
  Course,
  Branch,
  Enquiry,
  Offer,
  SiteSettings,
  AuditLog,
  EnquiryStatus,
  CourseCategory
} from '../types';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  seedCoursesIfEmpty
} from '../services/courseService';
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from '../services/enquiryService';
import {
  updateBranch,
  seedBranchesIfEmpty
} from '../services/branchService';
import {
  createOffer,
  updateOffer,
  deleteOffer,
  seedOffersIfEmpty
} from '../services/offerService';
import {
  saveSiteSettings
} from '../services/settingsService';
import {
  logAudit,
  getAuditLogs
} from '../services/auditService';
import { useAuth, BOOTSTRAP_ADMIN_EMAIL } from '../context/AuthContext';
import { CATEGORIES } from '../data/seedData';

interface AdminPortalViewProps {
  courses: Course[];
  branches: Branch[];
  offers: Offer[];
  settings: SiteSettings;
  onRefreshAllData: () => Promise<void>;
}

type AdminTab =
  | 'overview'
  | 'courses'
  | 'enquiries'
  | 'branches'
  | 'offers'
  | 'settings'
  | 'audit';

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  courses,
  branches,
  offers,
  settings,
  onRefreshAllData,
}) => {
  const { currentUser, isAdmin, loginWithGoogle, provisionAdminDoc } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Enquiries state
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(false);
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('All');

  // Audit logs state
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Modals & form state
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states for Course
  const [courseName, setCourseName] = useState('');
  const [courseCategory, setCourseCategory] = useState<CourseCategory>('AI & Advanced Tools');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseEligibility, setCourseEligibility] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseFee, setCourseFee] = useState<number>(10000);
  const [courseDiscount, setCourseDiscount] = useState<number>(20);
  const [courseBranches, setCourseBranches] = useState<string[]>([]);
  const [courseActive, setCourseActive] = useState<boolean>(true);
  const [courseImage, setCourseImage] = useState<string>('');
  const [courseNotes, setCourseNotes] = useState<string>('');

  // Branch editing state
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [branchAddress, setBranchAddress] = useState('');
  const [branchLocality, setBranchLocality] = useState('');
  const [branchPhone, setBranchPhone] = useState('');
  const [branchTiming, setBranchTiming] = useState('');

  // Offer editing state
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDiscount, setOfferDiscount] = useState<number>(25);
  const [offerDescription, setOfferDescription] = useState('');
  const [offerTerms, setOfferTerms] = useState('');
  const [offerActive, setOfferActive] = useState(true);

  // Site Settings Form
  const [sitePhone, setSitePhone] = useState(settings.phone);
  const [siteWhatsApp, setSiteWhatsApp] = useState(settings.isWhatsAppEnabled);
  const [siteAnnouncement, setSiteAnnouncement] = useState(settings.announcement);

  // Status message
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Delete confirmation
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'course' | 'enquiry' | 'offer';
    id: string;
    name: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const loadEnquiries = async () => {
    try {
      setEnquiriesLoading(true);
      const list = await getAllEnquiries();
      setEnquiries(list);
    } catch (err: any) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setEnquiriesLoading(false);
    }
  };

  const loadLogs = async () => {
    try {
      const logs = await getAuditLogs();
      setAuditLogs(logs);
    } catch (err) {
      console.warn('Error fetching audit logs:', err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadEnquiries();
      loadLogs();
    }
  }, [isAdmin]);

  // If user is not signed in
  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#0A192F] text-amber-400 flex items-center justify-center mx-auto shadow-xl">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 font-brand">
            Advance AI Institute • Admin Portal
          </h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Restricted administrative area. Please sign in with your authorized Google administrator credentials to manage courses, enquiries, and branch configurations.
          </p>
        </div>
        <button
          onClick={loginWithGoogle}
          className="px-8 py-3.5 rounded-xl bg-[#0A192F] text-amber-400 font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-blue-900 transition-all"
        >
          Sign In as Administrator
        </button>
      </div>
    );
  }

  // If user is signed in but not detected as admin yet
  if (!isAdmin) {
    const isBootstrappable = currentUser.email === BOOTSTRAP_ADMIN_EMAIL;
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl mt-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 font-brand">Administrator Verification Required</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Signed in as <strong>{currentUser.email}</strong>. This account does not currently hold administrative permissions in Firestore.
          </p>
        </div>

        {isBootstrappable ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-3 text-left">
            <span className="font-bold block">✓ Verified Bootstrapped Administrator Detected</span>
            <p className="text-slate-700">
              Your email <strong>{BOOTSTRAP_ADMIN_EMAIL}</strong> matches the designated system administrator rule. Click below to initialize your admin document in Firestore.
            </p>
            <button
              onClick={async () => {
                try {
                  await provisionAdminDoc();
                  await onRefreshAllData();
                  showNotification('success', 'Admin document successfully initialized!');
                } catch (err: any) {
                  showNotification('error', 'Error creating admin document: ' + err.message);
                }
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase"
            >
              Initialize Admin Document
            </button>
          </div>
        ) : (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 text-left space-y-2">
            <span className="font-bold text-slate-900 block">Initial Admin Setup Guide:</span>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Sign in using the primary project email: <code>expert.ngarh@gmail.com</code></li>
              <li>Or ask an existing administrator to register your UID: <code>{currentUser.uid}</code> in the <code>admins</code> collection.</li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  // Admin Actions: Course Save
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const discount = Math.min(Math.max(Number(courseDiscount) || 0, 0), 50);
      const fee = Number(courseFee) || 0;
      const finalFee = Math.round(fee * (1 - discount / 100));

      const payload = {
        name: courseName.trim(),
        category: courseCategory,
        description: courseDescription.trim(),
        eligibility: courseEligibility.trim() || '10+2 / Open',
        duration: courseDuration.trim(),
        fee,
        discount,
        finalFee,
        branchAvailability: courseBranches.length > 0 ? courseBranches : branches.map(b => b.name),
        active: courseActive,
        image: courseImage.trim() || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        admissionNotes: courseNotes.trim() || undefined,
        isExample: false,
      };

      if (editingCourse) {
        await updateCourse(editingCourse.id, payload);
        await logAudit('COURSE_UPDATED', 'Course', `Updated course: ${payload.name}`, currentUser.email || 'Admin', editingCourse.id);
        showNotification('success', `Course "${payload.name}" updated successfully!`);
      } else {
        const newId = await createCourse(payload);
        await logAudit('COURSE_CREATED', 'Course', `Created course: ${payload.name}`, currentUser.email || 'Admin', newId);
        showNotification('success', `Course "${payload.name}" created successfully!`);
      }

      setIsCourseModalOpen(false);
      setEditingCourse(null);
      await onRefreshAllData();
      await loadLogs();
    } catch (err: any) {
      showNotification('error', 'Error saving course: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setCourseCategory(course.category);
    setCourseDescription(course.description);
    setCourseEligibility(course.eligibility);
    setCourseDuration(course.duration);
    setCourseFee(course.fee);
    setCourseDiscount(course.discount);
    setCourseBranches(course.branchAvailability || []);
    setCourseActive(course.active);
    setCourseImage(course.image || '');
    setCourseNotes(course.admissionNotes || '');
    setIsCourseModalOpen(true);
  };

  const openNewCourse = () => {
    setEditingCourse(null);
    setCourseName('');
    setCourseCategory('AI & Advanced Tools');
    setCourseDescription('');
    setCourseEligibility('10+2 / Open');
    setCourseDuration('3 Months');
    setCourseFee(12000);
    setCourseDiscount(20);
    setCourseBranches(branches.map(b => b.name));
    setCourseActive(true);
    setCourseImage('');
    setCourseNotes('');
    setIsCourseModalOpen(true);
  };

  // Branch Save
  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch) return;
    setActionLoading(true);

    try {
      await updateBranch(editingBranch.id, {
        address: branchAddress.trim(),
        locality: branchLocality.trim(),
        phone: branchPhone.trim(),
        timing: branchTiming.trim(),
      });

      await logAudit(
        'BRANCH_UPDATED',
        'Branch',
        `Updated branch info: ${editingBranch.name} (Locality: ${branchLocality})`,
        currentUser.email || 'Admin',
        editingBranch.id
      );

      showNotification('success', `Branch "${editingBranch.name}" details updated.`);
      setEditingBranch(null);
      await onRefreshAllData();
      await loadLogs();
    } catch (err: any) {
      showNotification('error', 'Error updating branch: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Offer Save
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const discountPercentage = Math.min(Math.max(Number(offerDiscount) || 10, 10), 50);
      const payload = {
        title: offerTitle.trim(),
        discountPercentage,
        description: offerDescription.trim(),
        terms: offerTerms.trim(),
        validTill: 'Ongoing Session',
        active: offerActive,
      };

      if (editingOffer) {
        await updateOffer(editingOffer.id, payload);
        await logAudit('OFFER_UPDATED', 'Offer', `Updated offer: ${payload.title}`, currentUser.email || 'Admin', editingOffer.id);
        showNotification('success', `Offer "${payload.title}" updated.`);
      } else {
        const id = await createOffer(payload);
        await logAudit('OFFER_CREATED', 'Offer', `Created offer: ${payload.title}`, currentUser.email || 'Admin', id);
        showNotification('success', `Offer "${payload.title}" created.`);
      }

      setIsOfferModalOpen(false);
      setEditingOffer(null);
      await onRefreshAllData();
      await loadLogs();
    } catch (err: any) {
      showNotification('error', 'Error saving offer: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Site Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      await saveSiteSettings({
        ...settings,
        phone: sitePhone.trim(),
        isWhatsAppEnabled: siteWhatsApp,
        announcement: siteAnnouncement.trim(),
      });

      await logAudit('SETTINGS_UPDATED', 'Settings', `Updated phone: ${sitePhone}, WhatsApp: ${siteWhatsApp}`, currentUser.email || 'Admin');
      showNotification('success', 'Institute website settings saved.');
      await onRefreshAllData();
      await loadLogs();
    } catch (err: any) {
      showNotification('error', 'Error saving settings: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Enquiry status change
  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      await updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
      await logAudit('ENQUIRY_STATUS_UPDATED', 'Enquiry', `Changed status to ${newStatus}`, currentUser.email || 'Admin', enquiryId);
      showNotification('success', `Status updated to ${newStatus}`);
    } catch (err: any) {
      showNotification('error', 'Failed to update enquiry: ' + err.message);
    }
  };

  // Add notes to enquiry
  const handleAddNotes = async (enquiryId: string, notes: string) => {
    try {
      const enq = enquiries.find(e => e.id === enquiryId);
      if (!enq) return;
      await updateEnquiryStatus(enquiryId, enq.status, notes);
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, adminNotes: notes } : e));
      showNotification('success', 'Counselor notes saved.');
    } catch (err: any) {
      showNotification('error', 'Failed to save notes: ' + err.message);
    }
  };

  // Delete Action Confirm
  const executeDelete = async () => {
    if (!deleteConfirmation) return;
    setActionLoading(true);

    try {
      if (deleteConfirmation.type === 'course') {
        await deleteCourse(deleteConfirmation.id);
        await logAudit('COURSE_DELETED', 'Course', `Deleted course ${deleteConfirmation.name}`, currentUser.email || 'Admin', deleteConfirmation.id);
        showNotification('success', `Course deleted.`);
        await onRefreshAllData();
      } else if (deleteConfirmation.type === 'enquiry') {
        await deleteEnquiry(deleteConfirmation.id);
        setEnquiries(prev => prev.filter(e => e.id !== deleteConfirmation.id));
        await logAudit('ENQUIRY_DELETED', 'Enquiry', `Deleted enquiry ${deleteConfirmation.name}`, currentUser.email || 'Admin', deleteConfirmation.id);
        showNotification('success', `Enquiry deleted.`);
      } else if (deleteConfirmation.type === 'offer') {
        await deleteOffer(deleteConfirmation.id);
        await logAudit('OFFER_DELETED', 'Offer', `Deleted offer ${deleteConfirmation.name}`, currentUser.email || 'Admin', deleteConfirmation.id);
        showNotification('success', `Offer deleted.`);
        await onRefreshAllData();
      }
      setDeleteConfirmation(null);
      await loadLogs();
    } catch (err: any) {
      showNotification('error', 'Delete operation failed: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Export Enquiries as CSV
  const exportEnquiriesCSV = () => {
    if (enquiries.length === 0) {
      showNotification('error', 'No enquiries to export.');
      return;
    }

    const headers = ['Enquiry ID', 'Date', 'Student Name', 'Phone', 'Email', 'Course', 'Branch', 'Status', 'Notes'];
    const rows = enquiries.map(e => [
      e.id,
      new Date(e.createdAt).toLocaleDateString('en-IN'),
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ''}"`,
      `"${e.selectedCourse.replace(/"/g, '""')}"`,
      `"${e.preferredBranch.replace(/"/g, '""')}"`,
      e.status,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Advance_AI_Institute_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Enquiries CSV downloaded successfully!');
  };

  // Seed default collections if empty
  const handleSeedDatabase = async () => {
    try {
      setActionLoading(true);
      await seedCoursesIfEmpty(currentUser.email || 'admin');
      await seedBranchesIfEmpty();
      await seedOffersIfEmpty();
      await onRefreshAllData();
      await logAudit('DATABASE_SEEDED', 'System', 'Seeded initial courses and branches to Firestore', currentUser.email || 'Admin');
      showNotification('success', 'Initial database records verified and seeded to Firestore!');
      await loadLogs();
    } catch (err: any) {
      showNotification('error', 'Seeding failed: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Metrics for overview
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === 'New').length;
  const contactedEnquiries = enquiries.filter(e => e.status === 'Contacted').length;
  const convertedEnquiries = enquiries.filter(e => e.status === 'Converted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-bold transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-red-600 text-white shadow-md'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="p-1 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Navigation Header */}
      <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-brand tracking-tight">
            Advance AI Institute Portal
          </h1>
          <p className="text-xs text-slate-300">
            Logged in as <strong>{currentUser.email}</strong> • Role: <strong>Superadmin</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={async () => {
              await onRefreshAllData();
              await loadEnquiries();
              await loadLogs();
              showNotification('success', 'All database collections synced.');
            }}
            disabled={actionLoading}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync DB</span>
          </button>

          <button
            onClick={handleSeedDatabase}
            disabled={actionLoading}
            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Seed default courses and branches if Firestore is empty"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Seed Default Catalog</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
          { id: 'branches', label: `Branches (${branches.length})`, icon: Building2 },
          { id: 'offers', label: `Scholarships (${offers.length})`, icon: Tag },
          { id: 'settings', label: 'Site Settings', icon: Settings },
          { id: 'audit', label: 'Audit Trail', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-[#0A192F] text-amber-400 shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Enquiries</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-900">{totalEnquiries}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 font-bold">
                  {newEnquiries} New
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Courses</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-[#0A192F]">{courses.filter(c => c.active).length}</span>
                <span className="text-xs text-slate-500 font-medium">of {courses.length} listed</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Conversions</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-emerald-600">{convertedEnquiries}</span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  {totalEnquiries > 0 ? Math.round((convertedEnquiries / totalEnquiries) * 100) : 0}% Rate
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Najafgarh Branches</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-amber-600">3</span>
                <span className="text-xs text-slate-500 font-medium">All active</span>
              </div>
            </div>
          </div>

          {/* Quick Enquiries Flow Pipeline */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Enquiry Status Pipeline
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                <span className="text-xs font-semibold text-blue-900">New Submissions</span>
                <div className="text-2xl font-extrabold text-blue-950">{newEnquiries}</div>
                <p className="text-[10px] text-blue-700">Needs initial call from desk</p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="text-xs font-semibold text-amber-900">Contacted</span>
                <div className="text-2xl font-extrabold text-amber-950">{contactedEnquiries}</div>
                <p className="text-[10px] text-amber-700">Demo class or syllabus sent</p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-xs font-semibold text-purple-900">Follow-Up Required</span>
                <div className="text-2xl font-extrabold text-purple-950">
                  {enquiries.filter(e => e.status === 'Follow-up').length}
                </div>
                <p className="text-[10px] text-purple-700">Decision pending</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-semibold text-emerald-900">Converted / Enrolled</span>
                <div className="text-2xl font-extrabold text-emerald-950">{convertedEnquiries}</div>
                <p className="text-[10px] text-emerald-700">Confirmed admissions</p>
              </div>
            </div>
          </div>

          {/* Recent Enquiries snippet */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Recent Inquiries (Latest 5)
              </h3>
              <button
                onClick={() => setActiveTab('enquiries')}
                className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5">Date</th>
                    <th>Student Name</th>
                    <th>Phone</th>
                    <th>Course</th>
                    <th>Branch</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.slice(0, 5).map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50">
                      <td className="py-2.5 text-slate-500">
                        {new Date(enq.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="font-bold text-slate-900">{enq.name}</td>
                      <td className="font-medium text-slate-700">{enq.phone}</td>
                      <td className="text-slate-800">{enq.selectedCourse}</td>
                      <td className="text-slate-600">{enq.preferredBranch.split('-')[0]}</td>
                      <td>
                        <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-800 font-bold text-[10px]">
                          {enq.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action & Filter Strip */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search name, phone, course..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900"
                />
              </div>

              <select
                value={enquiryStatusFilter}
                onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Converted">Converted</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={loadEnquiries}
                disabled={enquiriesLoading}
                className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${enquiriesLoading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={exportEnquiriesCSV}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="space-y-3">
            {enquiries
              .filter(e => {
                const matchesSearch =
                  e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                  e.phone.includes(enquirySearch) ||
                  e.selectedCourse.toLowerCase().includes(enquirySearch.toLowerCase());
                const matchesStatus = enquiryStatusFilter === 'All' || e.status === enquiryStatusFilter;
                return matchesSearch && matchesStatus;
              })
              .map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-900">{enq.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400">({enq.id})</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Applied for: <strong className="text-blue-900">{enq.selectedCourse}</strong> • Branch: <strong>{enq.preferredBranch}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                          enq.status === 'New'
                            ? 'bg-blue-50 text-blue-900 border-blue-300'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : enq.status === 'Follow-up'
                            ? 'bg-purple-50 text-purple-900 border-purple-300'
                            : enq.status === 'Converted'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Follow-up">Status: Follow-up</option>
                        <option value="Converted">Status: Converted</option>
                        <option value="Archived">Status: Archived</option>
                      </select>

                      <button
                        onClick={() => setDeleteConfirmation({ type: 'enquiry', id: enq.id, name: enq.name })}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase text-[10px]">Mobile Phone:</span>
                      <a href={`tel:${enq.phone}`} className="font-bold text-slate-900 hover:text-blue-900">
                        +91 {enq.phone}
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase text-[10px]">Email Address:</span>
                      <span className="text-slate-700">{enq.email || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block uppercase text-[10px]">Submitted Date:</span>
                      <span className="text-slate-700">{new Date(enq.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {enq.message && (
                    <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                      <strong>Student Question / Message:</strong> {enq.message}
                    </div>
                  )}

                  {/* Internal Counselor Notes */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add administrative follow-up notes..."
                      defaultValue={enq.adminNotes || ''}
                      onBlur={(e) => {
                        if (e.target.value !== (enq.adminNotes || '')) {
                          handleAddNotes(enq.id, e.target.value);
                        }
                      }}
                      className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">Auto-saves on blur</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 3: COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Course Catalogue Management ({courses.length})</h3>
            <button
              onClick={openNewCourse}
              className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-blue-900 text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-900 text-[10px] font-bold uppercase">
                      {course.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                      course.active ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {course.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{course.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Duration:</span>
                      <strong className="text-slate-800">{course.duration}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Regular Fee:</span>
                      <span className="text-slate-800 font-medium">₹{course.fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Discount:</span>
                      <strong className="text-amber-600">{course.discount}% Off</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-1 font-bold">
                      <span className="text-slate-900">Final Fee:</span>
                      <span className="text-blue-900">₹{course.finalFee}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditCourse(course)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmation({ type: 'course', id: course.id, name: course.name })}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BRANCHES */}
      {activeTab === 'branches' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
            <Building2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm">Branch Management & Locality Customization</strong>
              <p className="mt-0.5 text-slate-700">
                You can review official plot numbers, confirm or complete the locality/address for Branch 3 (Gupta Market), update contact numbers, and adjust center timings here.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {branches.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-[#0A192F] text-amber-400 text-xs font-bold">
                      {b.name.split('-')[0].trim()}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{b.plotNo}</span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900">{b.name}</h4>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium text-slate-800">
                      {b.address}
                    </p>
                    <p><strong>Locality:</strong> {b.locality || 'Najafgarh'}</p>
                    <p><strong>Landmark:</strong> {b.landmark}</p>
                    <p><strong>Phone:</strong> {b.phone}</p>
                    <p><strong>Timings:</strong> {b.timing}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setEditingBranch(b);
                      setBranchAddress(b.address);
                      setBranchLocality(b.locality || '');
                      setBranchPhone(b.phone);
                      setBranchTiming(b.timing);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit Branch & Locality</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SCHOLARSHIPS / OFFERS */}
      {activeTab === 'offers' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Promotional Scholarships & Seasonal Concessions (10% to 50%)
            </h3>
            <button
              onClick={() => {
                setEditingOffer(null);
                setOfferTitle('');
                setOfferDiscount(25);
                setOfferDescription('');
                setOfferTerms('');
                setOfferActive(true);
                setIsOfferModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#0A192F] hover:bg-blue-900 text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Offer</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-black text-xs">
                      {offer.discountPercentage}% OFF
                    </span>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold ${
                      offer.active ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {offer.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">{offer.title}</h4>
                  <p className="text-xs text-slate-600">{offer.description}</p>
                  {offer.terms && (
                    <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      Terms: {offer.terms}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingOffer(offer);
                      setOfferTitle(offer.title);
                      setOfferDiscount(offer.discountPercentage);
                      setOfferDescription(offer.description);
                      setOfferTerms(offer.terms);
                      setOfferActive(offer.active);
                      setIsOfferModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmation({ type: 'offer', id: offer.id, name: offer.title })}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-slate-900 font-brand">Institute Global Settings</h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Central Telephone Helpline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={sitePhone}
                onChange={(e) => setSitePhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900 font-bold"
              />
              <span className="text-[10px] text-slate-400">Default official phone: 8700573469</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={siteWhatsApp}
                  onChange={(e) => setSiteWhatsApp(e.target.checked)}
                  className="rounded-sm text-emerald-600 h-4 w-4"
                />
                <span className="text-xs font-bold text-slate-800">
                  Confirm WhatsApp Status (Enabled for {sitePhone})
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                As required, mobile-friendly WhatsApp links will only be rendered when verified as WhatsApp-enabled.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Top Announcement Bar Text
              </label>
              <textarea
                rows={2}
                maxLength={500}
                value={siteAnnouncement}
                onChange={(e) => setSiteAnnouncement(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white text-slate-900 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className="px-6 py-2.5 rounded-xl bg-[#0A192F] text-amber-400 font-bold text-xs uppercase tracking-wider hover:bg-blue-900 transition-colors shadow-xs"
            >
              {actionLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 7: AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Administrative Audit Logs</h3>
            <button
              onClick={loadLogs}
              className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Log</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="p-3.5">Timestamp</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Details</th>
                    <th>Performed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400">
                        No audit events recorded yet.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3.5 text-slate-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString('en-IN')}
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-900 font-mono font-bold text-[10px]">
                            {log.action}
                          </span>
                        </td>
                        <td className="font-semibold text-slate-800">{log.entityType}</td>
                        <td className="text-slate-600 max-w-md truncate">{log.details}</td>
                        <td className="font-medium text-slate-700">{log.performedBy}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* COURSE CREATE/EDIT MODAL */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-brand">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value as CourseCategory)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 font-medium"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3 Months or 1 Year"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Standard Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={courseFee}
                    onChange={(e) => setCourseFee(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Discount (0% - 50%) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    max={50}
                    value={courseDiscount}
                    onChange={(e) => setCourseDiscount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Calculated Final Fee</label>
                  <div className="px-3.5 py-2 text-xs bg-slate-100 border rounded-xl font-extrabold text-blue-900">
                    ₹{Math.round(courseFee * (1 - (Math.min(Math.max(courseDiscount, 0), 50) / 100)))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={courseEligibility}
                  onChange={(e) => setCourseEligibility(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Course Description *</label>
                <textarea
                  rows={3}
                  required
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={courseImage}
                  onChange={(e) => setCourseImage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admission & Examination Notes</label>
                <textarea
                  rows={2}
                  value={courseNotes}
                  onChange={(e) => setCourseNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="courseActive"
                  checked={courseActive}
                  onChange={(e) => setCourseActive(e.target.checked)}
                  className="rounded-sm text-blue-600"
                />
                <label htmlFor="courseActive" className="text-xs font-bold text-slate-700">
                  Course is Active and visible in public catalogue
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2 bg-[#0A192F] text-amber-400 font-bold text-xs uppercase rounded-xl hover:bg-blue-900"
                >
                  {actionLoading ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BRANCH EDIT MODAL */}
      {editingBranch && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-brand">
                Edit Branch: {editingBranch.name}
              </h3>
              <button onClick={() => setEditingBranch(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBranch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Address *</label>
                <textarea
                  rows={3}
                  required
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Locality / Landmark Details *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Opposite Gupta Market, Najafgarh, New Delhi"
                  value={branchLocality}
                  onChange={(e) => setBranchLocality(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                />
                <span className="text-[10px] text-slate-400">Confirm or complete the locality address if needed</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Direct Phone *</label>
                  <input
                    type="text"
                    required
                    value={branchPhone}
                    onChange={(e) => setBranchPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Center Timings *</label>
                  <input
                    type="text"
                    required
                    value={branchTiming}
                    onChange={(e) => setBranchTiming(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingBranch(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2 bg-[#0A192F] text-amber-400 font-bold text-xs uppercase rounded-xl hover:bg-blue-900"
                >
                  {actionLoading ? 'Saving...' : 'Update Branch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OFFER EDIT MODAL */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-brand">
                {editingOffer ? 'Edit Scholarship / Offer' : 'Create Scholarship Offer'}
              </h3>
              <button onClick={() => setIsOfferModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Discount Percentage (10% to 50%) *
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  max={50}
                  value={offerDiscount}
                  onChange={(e) => setOfferDiscount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={offerDescription}
                  onChange={(e) => setOfferDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Terms & Eligibility Conditions</label>
                <textarea
                  rows={2}
                  value={offerTerms}
                  onChange={(e) => setOfferTerms(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:bg-white text-slate-900 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offerActive"
                  checked={offerActive}
                  onChange={(e) => setOfferActive(e.target.checked)}
                  className="rounded-sm text-blue-600"
                />
                <label htmlFor="offerActive" className="text-xs font-bold text-slate-700">
                  Offer is Active on Website Banner
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2 bg-[#0A192F] text-amber-400 font-bold text-xs uppercase rounded-xl hover:bg-blue-900"
                >
                  {actionLoading ? 'Saving...' : 'Save Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-slate-900">Confirm Deletion</h4>
              <p className="text-xs text-slate-600">
                Are you sure you want to delete <strong>{deleteConfirmation.name}</strong>? This action will permanently remove it from Firestore.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={actionLoading}
                className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
