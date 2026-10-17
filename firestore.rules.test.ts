/**
 * Security Rule Test Specification for Advance AI Institute
 * Verifies that the Dirty Dozen threat vectors are blocked and invariants hold.
 */

export interface RuleTestCase {
  id: string;
  name: string;
  action: 'create' | 'read' | 'update' | 'delete';
  collection: string;
  payload: Record<string, unknown>;
  expectedOutcome: 'PERMISSION_DENIED' | 'ALLOWED';
  reason: string;
}

export const dirtyDozenTestCases: RuleTestCase[] = [
  {
    id: 'SEC-01',
    name: 'Privilege escalation via unauthorized admin document creation',
    action: 'create',
    collection: 'admins',
    payload: { email: 'hacker@example.com', role: 'admin' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Admins can only be provisioned by existing verified admins or bootstrapped identity.'
  },
  {
    id: 'SEC-02',
    name: 'Public deletion of course catalog',
    action: 'delete',
    collection: 'courses',
    payload: { id: 'python-fullstack' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Courses are read-only to public; only authenticated admins can delete.'
  },
  {
    id: 'SEC-03',
    name: 'Invalid out-of-bound discount exploitation (90%)',
    action: 'update',
    collection: 'courses',
    payload: { discount: 90 },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Discount percentage is strictly bounded between 0% and 50%.'
  },
  {
    id: 'SEC-04',
    name: 'PII scraping on student enquiries without auth',
    action: 'read',
    collection: 'enquiries',
    payload: {},
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Enquiries contain personal student data and cannot be read anonymously.'
  },
  {
    id: 'SEC-05',
    name: 'Cross-student inquiry access',
    action: 'read',
    collection: 'enquiries',
    payload: { userId: 'student_B' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Students can only list and get their own enquiry matching request.auth.uid.'
  },
  {
    id: 'SEC-06',
    name: 'Shadow field injection on enquiry submission',
    action: 'create',
    collection: 'enquiries',
    payload: { status: 'Converted', adminNotes: 'Injected' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Public enquiry submission requires initial status "New" and forbids adminNotes.'
  },
  {
    id: 'SEC-07',
    name: 'Denial of wallet via 2MB oversized message payload',
    action: 'create',
    collection: 'enquiries',
    payload: { message: 'A'.repeat(5000) },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Message string size is constrained to a maximum of 1000 characters.'
  },
  {
    id: 'SEC-08',
    name: 'Admin email spoofing with unverified email',
    action: 'update',
    collection: 'courses',
    payload: { name: 'Defaced Course' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Admin authorization requires email_verified == true.'
  },
  {
    id: 'SEC-09',
    name: 'Branch defacement by unauthenticated user',
    action: 'update',
    collection: 'branches',
    payload: { address: 'Malicious Address' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Branches are publicly readable but only editable by admins.'
  },
  {
    id: 'SEC-10',
    name: 'Audit log tampering or deletion',
    action: 'delete',
    collection: 'auditLogs',
    payload: { id: 'log_123' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Audit logs are immutable append-only records.'
  },
  {
    id: 'SEC-11',
    name: 'Document ID poisoning with path traversal chars',
    action: 'create',
    collection: 'courses',
    payload: { id: '../../etc/passwd' },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Path IDs must conform to alphanumeric, hyphen, and underscore regex.'
  },
  {
    id: 'SEC-12',
    name: 'Promotional offer modification by unauthorized user',
    action: 'update',
    collection: 'offers',
    payload: { discountPercentage: 80 },
    expectedOutcome: 'PERMISSION_DENIED',
    reason: 'Offers can only be managed by verified administrators.'
  }
];
