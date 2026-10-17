# Security Specification & Threat Model for Advance AI Institute

## 1. Data Invariants
1. **Public vs Restricted Access**: Anonymous / unauthenticated public users may read active courses, active branches, active promotional offers, and site settings. Public users may submit enquiries with strict validation.
2. **Enquiries Protection**: Enquiries contain student PII (phone number, name, optional email, message). Non-admin users cannot read other students' enquiries. Only authorized admins or the submitting student (when authenticated with matching `userId`) can read their specific enquiry.
3. **Admin Privilege Invariant**: Admin status is NEVER derived from client tokens or untrusted client payload claims. Admin verification requires an authoritative record in `/databases/$(database)/documents/admins/$(request.auth.uid)` or verified match with system bootstrapped admin `expert.ngarh@gmail.com` with `email_verified == true`.
4. **Discount Invariant**: Course discount percentage must be strictly bounded between 0% and 50% (special offers 10% to 50%).
5. **Mutation Invariant**: Public users cannot alter, archive, or delete courses, branches, offers, site settings, or audit logs. Only verified admins have write access to management collections.
6. **ID Safety & Denial of Wallet**: All document IDs must be validated with regex `^[a-zA-Z0-9_-]+$` and length `<= 128`. All strings must have strict maximum length constraints to prevent resource exhaustion attacks.

## 2. The Dirty Dozen Payloads (Targeting Exploits)

1. **Payload 1: Privilege Escalation via Fake Admin Doc**
   - Attacker attempts to create `/admins/attacker_uid` with `{ role: "admin" }` anonymously or as regular user.
   - *Expected Result*: PERMISSION_DENIED.
2. **Payload 2: Public Course Deletion / Defacement**
   - Attacker sends `DELETE /courses/python-fullstack` without admin credentials.
   - *Expected Result*: PERMISSION_DENIED.
3. **Payload 3: Negative / 90% Invalid Discount Exploitation**
   - Attacker updates course discount to `99%` or negative `-50%`.
   - *Expected Result*: PERMISSION_DENIED (Must obey valid discount range 0-50%).
4. **Payload 4: PII Scraping on Enquiries**
   - Unauthenticated attacker attempts `GET /enquiries` to list all student phone numbers.
   - *Expected Result*: PERMISSION_DENIED.
5. **Payload 5: Cross-Student Enquiry Snooping**
   - Student A attempts `GET /enquiries/{student_B_enquiry_id}`.
   - *Expected Result*: PERMISSION_DENIED.
6. **Payload 6: Shadow Field Injection in Enquiry Submission**
   - Attacker submits an enquiry with injected ghost field `{ status: "Converted", adminNotes: "Hacked", isAdmin: true }`.
   - *Expected Result*: PERMISSION_DENIED (Enquiry submission requires status to start as "New" and only allowed keys).
7. **Payload 7: Unbounded Memory Denial of Wallet in Enquiry Message**
   - Attacker sends an enquiry with a 2MB message string.
   - *Expected Result*: PERMISSION_DENIED (Message string size must be <= 1000).
8. **Payload 8: Email Spoofing Attack**
   - Attacker signs in with unverified email matching the admin email (`email_verified: false`).
   - *Expected Result*: PERMISSION_DENIED (Admin check enforces `request.auth.token.email_verified == true`).
9. **Payload 9: Branch Address Defacement / Phishing Injection**
   - Unauthenticated attacker modifies branch address to a fake location or malicious link.
   - *Expected Result*: PERMISSION_DENIED.
10. **Payload 10: Audit Log Tampering**
    - Regular user attempts to overwrite or delete entries in `/auditLogs`.
    - *Expected Result*: PERMISSION_DENIED.
11. **Payload 11: Malicious ID Poisoning**
    - Attacker attempts to write a document with an ID containing path traversal `../../../etc/passwd` or excessive junk characters.
    - *Expected Result*: PERMISSION_DENIED (`isValidId` check).
12. **Payload 12: Offer Modification by Unauthorized User**
    - Attacker updates `/offers/seasonal-discount` to 100% off.
    - *Expected Result*: PERMISSION_DENIED.

## 3. Test Runner Specification (`firestore.rules.test.ts`)
The test suite validates:
- Denial of unauthorized writes to `/courses`, `/branches`, `/offers`, `/siteSettings`, `/admins`, `/auditLogs`.
- Denial of unauthenticated or non-owner reads to `/enquiries`.
- Approval of valid enquiry creation with initial status "New" and sanitized field bounds.
- Approval of admin operations only when authenticated with verified admin credentials.
