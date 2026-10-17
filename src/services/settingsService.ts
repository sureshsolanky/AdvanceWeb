import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { SiteSettings } from '../types';
import { INITIAL_SETTINGS } from '../data/seedData';

const COLLECTION_NAME = 'siteSettings';
const SETTINGS_DOC_ID = 'general';

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as SiteSettings;
    }
    return INITIAL_SETTINGS;
  } catch (error) {
    console.warn('Falling back to local initial settings if fetch fails:', error);
    return INITIAL_SETTINGS;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${SETTINGS_DOC_ID}`);
  }
}
