import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Offer } from '../types';
import { INITIAL_OFFERS } from '../data/seedData';

const COLLECTION_NAME = 'offers';

export async function getOffers(): Promise<Offer[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (querySnapshot.empty) {
      return INITIAL_OFFERS;
    }
    const offers: Offer[] = [];
    querySnapshot.forEach((docSnap) => {
      offers.push({ id: docSnap.id, ...(docSnap.data() as Omit<Offer, 'id'>) });
    });
    return offers;
  } catch (error) {
    console.warn('Falling back to local seed offers if fetch fails:', error);
    return INITIAL_OFFERS;
  }
}

export async function seedOffersIfEmpty(): Promise<void> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (querySnapshot.empty) {
      for (const offer of INITIAL_OFFERS) {
        const { id, ...data } = offer;
        await setDoc(doc(db, COLLECTION_NAME, id), data);
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
}

export async function createOffer(offerData: Omit<Offer, 'id'>): Promise<string> {
  const generatedId = 'offer-' + Date.now().toString(36);
  // Enforce discount between 10% and 50%
  const discountPercentage = Math.min(Math.max(offerData.discountPercentage, 10), 50);

  const payload: Omit<Offer, 'id'> = {
    ...offerData,
    discountPercentage,
  };

  try {
    await setDoc(doc(db, COLLECTION_NAME, generatedId), payload);
    return generatedId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${generatedId}`);
  }
}

export async function updateOffer(id: string, updates: Partial<Offer>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const sanitized: Partial<Offer> = { ...updates };
    if (updates.discountPercentage !== undefined) {
      sanitized.discountPercentage = Math.min(Math.max(updates.discountPercentage, 10), 50);
    }
    await updateDoc(docRef, sanitized as Record<string, unknown>);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
  }
}

export async function deleteOffer(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }
}
