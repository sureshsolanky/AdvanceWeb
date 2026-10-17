import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Course } from '../types';
import { INITIAL_COURSES } from '../data/seedData';

const COLLECTION_NAME = 'courses';

export async function getCourses(): Promise<Course[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // If collection is not yet populated, return initial default list for smooth initial viewing
      return INITIAL_COURSES;
    }

    const courses: Course[] = [];
    querySnapshot.forEach((docSnap) => {
      courses.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Course, 'id'>),
      });
    });

    return courses;
  } catch (error) {
    console.warn('Falling back to local seed courses if Firestore fetch failed:', error);
    return INITIAL_COURSES;
  }
}

export async function seedCoursesIfEmpty(adminEmail: string): Promise<Course[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('Seeding initial courses to Firestore...');
      for (const course of INITIAL_COURSES) {
        const { id, ...data } = course;
        await setDoc(doc(db, COLLECTION_NAME, id), {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          seededBy: adminEmail
        });
      }
      return getCourses();
    }
    return getCourses();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
  }
}

export async function createCourse(courseData: Omit<Course, 'id'>): Promise<string> {
  const generatedId = (courseData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)).slice(0, 80);
  
  // Validate discount range (0 to 50%)
  const discount = Math.min(Math.max(courseData.discount || 0, 0), 50);
  const finalFee = Math.round(courseData.fee * (1 - discount / 100));

  const payload: Omit<Course, 'id'> = {
    ...courseData,
    discount,
    finalFee,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, COLLECTION_NAME, generatedId), payload);
    return generatedId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${generatedId}`);
  }
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    
    let sanitizedUpdates: Partial<Course> = {
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if (updates.fee !== undefined || updates.discount !== undefined) {
      const discount = Math.min(Math.max(updates.discount ?? 0, 0), 50);
      const fee = updates.fee ?? 0;
      sanitizedUpdates.discount = discount;
      sanitizedUpdates.finalFee = Math.round(fee * (1 - discount / 100));
    }

    await updateDoc(docRef, sanitizedUpdates as Record<string, unknown>);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
  }
}

export async function deleteCourse(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }
}
