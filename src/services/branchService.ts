import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Branch } from '../types';
import { INITIAL_BRANCHES } from '../data/seedData';

const COLLECTION_NAME = 'branches';

export async function getBranches(): Promise<Branch[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (querySnapshot.empty) {
      return INITIAL_BRANCHES;
    }
    const branches: Branch[] = [];
    querySnapshot.forEach((docSnap) => {
      branches.push({ id: docSnap.id, ...(docSnap.data() as Omit<Branch, 'id'>) });
    });
    return branches;
  } catch (error) {
    console.warn('Falling back to local seed branches if fetch fails:', error);
    return INITIAL_BRANCHES;
  }
}

export async function seedBranchesIfEmpty(): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (querySnapshot.empty) {
      for (const branch of INITIAL_BRANCHES) {
        const { id, ...data } = branch;
        await setDoc(doc(db, COLLECTION_NAME, id), data);
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
}

export async function updateBranch(branchId: string, updates: Partial<Branch>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, branchId);
    await updateDoc(docRef, updates as Record<string, unknown>);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${branchId}`);
  }
}
