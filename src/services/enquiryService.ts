import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Enquiry, EnquiryStatus } from '../types';

const COLLECTION_NAME = 'enquiries';

export async function submitEnquiry(payload: {
  name: string;
  phone: string;
  email?: string;
  selectedCourse: string;
  preferredBranch: string;
  message?: string;
}): Promise<string> {
  const enquiryId = 'enq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();

  // Validate phone format & required fields
  const cleanPhone = payload.phone.replace(/[^0-9+]/g, '');
  if (cleanPhone.length < 7) {
    throw new Error('Please enter a valid phone number with at least 7 digits.');
  }

  const newEnquiry: Record<string, unknown> = {
    name: payload.name.trim(),
    phone: cleanPhone,
    selectedCourse: payload.selectedCourse,
    preferredBranch: payload.preferredBranch,
    status: 'New',
    createdAt: now,
    updatedAt: now,
  };

  if (payload.email && payload.email.trim()) {
    newEnquiry.email = payload.email.trim();
  }
  if (payload.message && payload.message.trim()) {
    newEnquiry.message = payload.message.trim();
  }
  if (auth.currentUser) {
    newEnquiry.userId = auth.currentUser.uid;
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, enquiryId), newEnquiry);
    return enquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${enquiryId}`);
  }
}

export async function getStudentEnquiries(userId: string): Promise<Enquiry[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const list: Enquiry[] = [];
    querySnapshot.forEach((snap) => {
      list.push({ id: snap.id, ...(snap.data() as Omit<Enquiry, 'id'>) });
    });
    // Sort client-side by createdAt desc
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
  }
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    const list: Enquiry[] = [];
    querySnapshot.forEach((snap) => {
      list.push({ id: snap.id, ...(snap.data() as Omit<Enquiry, 'id'>) });
    });
    // Sort descending by createdAt
    list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
  }
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: EnquiryStatus,
  adminNotes?: string
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, enquiryId);
    const updates: Record<string, unknown> = {
      status,
      updatedAt: new Date().toISOString(),
    };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${enquiryId}`);
  }
}

export async function deleteEnquiry(enquiryId: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, enquiryId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${enquiryId}`);
  }
}
