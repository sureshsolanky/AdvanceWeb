export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  description: string;
  eligibility: string;
  duration: string;
  fee: number;
  discount: number; // 0 to 50%
  finalFee: number; // fee * (1 - discount/100)
  branchAvailability: string[]; // e.g. ["Branch 1", "Branch 2", "Branch 3"]
  active: boolean;
  image: string;
  admissionNotes?: string;
  syllabus?: string[];
  isExample?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CourseCategory =
  | 'AI & Advanced Tools'
  | 'Software Development'
  | 'Data & Analytics'
  | 'Accounting & Taxation'
  | 'Graphic & Multimedia'
  | 'Diploma Programs'
  | 'Teacher Training (NTT/JBT/B.Ed)'
  | 'University Correspondence'
  | 'Office & Fundamentals';

export interface Branch {
  id: string;
  name: string;
  plotNo: string;
  address: string;
  landmark: string;
  locality: string;
  phone: string;
  timing: string;
  facilities: string[];
  mapQuery: string;
  isActive: boolean;
  notes?: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Archived';

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  selectedCourse: string;
  preferredBranch: string;
  message?: string;
  status: EnquiryStatus;
  userId?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  discountPercentage: number; // 10% to 50%
  description: string;
  applicableCategories?: string[];
  validTill: string;
  terms: string;
  active: boolean;
}

export interface SiteSettings {
  instituteName: string;
  phone: string;
  isWhatsAppEnabled: boolean;
  admissionsOpen: boolean;
  announcement: string;
  updatedAt?: string;
}

export interface AdminRecord {
  uid: string;
  email: string;
  role: 'admin' | 'superadmin';
  addedAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: string;
  performedBy: string;
  timestamp: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'courses'
  | 'branches'
  | 'admissions'
  | 'contact'
  | 'student-portal'
  | 'admin';
