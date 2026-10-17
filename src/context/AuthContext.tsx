import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, testFirestoreConnection } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';

export const BOOTSTRAP_ADMIN_EMAIL = 'expert.ngarh@gmail.com';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isAuthReady: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  checkAdminStatus: (user: User) => Promise<boolean>;
  provisionAdminDoc: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  const checkAdminStatus = async (user: User): Promise<boolean> => {
    // 1. Check bootstrapped admin identity (with verified email)
    if (user.email === BOOTSTRAP_ADMIN_EMAIL && user.emailVerified) {
      return true;
    }

    // 2. Check authoritative record in /admins/{uid}
    try {
      const adminRef = doc(db, 'admins', user.uid);
      const snapshot = await getDoc(adminRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        return data.role === 'admin' || data.role === 'superadmin';
      }
    } catch {
      // If error or unauthenticated, default to false
      return false;
    }

    return false;
  };

  const provisionAdminDoc = async () => {
    if (!currentUser) return;
    try {
      const adminRef = doc(db, 'admins', currentUser.uid);
      await setDoc(adminRef, {
        email: currentUser.email,
        role: 'superadmin',
        addedAt: new Date().toISOString()
      }, { merge: true });
      setIsAdmin(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `admins/${currentUser.uid}`);
    }
  };

  useEffect(() => {
    // Test initial connection on boot as mandated
    testFirestoreConnection();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const adminCheck = await checkAdminStatus(user);
        setIsAdmin(adminCheck);

        // Auto-provision admin record if current user is the bootstrapped superadmin
        if (adminCheck && user.email === BOOTSTRAP_ADMIN_EMAIL) {
          try {
            const adminRef = doc(db, 'admins', user.uid);
            const docSnap = await getDoc(adminRef);
            if (!docSnap.exists()) {
              await setDoc(adminRef, {
                email: user.email,
                role: 'superadmin',
                addedAt: new Date().toISOString()
              });
            }
          } catch (e) {
            console.warn('Initial admin provision notice:', e);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthReady,
        loginWithGoogle,
        logout,
        checkAdminStatus,
        provisionAdminDoc
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
