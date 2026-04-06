import { useState, useEffect } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot,
  updateDoc,
  getDocFromServer
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, LearningState } from '../types';
import { useGameStore } from '../store/useGameStore';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Test connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}
testConnection();

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { setUser, user: storeUser } = useGameStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user exists in Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserProfile;
            setUser(userData);
            
            // Set up real-time listener for user data
            onSnapshot(doc(db, 'users', firebaseUser.uid), (snapshot) => {
              if (snapshot.exists()) {
                setUser(snapshot.data() as UserProfile);
              }
            }, (error) => {
              handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
            });
          } else {
            // New user, will need profile setup
            setUser(null);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${firebaseUser.uid}`);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  const login = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => auth.signOut();

  const createProfile = async (profile: Partial<UserProfile>) => {
    if (!auth.currentUser) return;

    const newProfile: UserProfile = {
      uid: auth.currentUser.uid,
      displayName: profile.displayName || auth.currentUser.displayName || 'Trainer',
      avatar: profile.avatar || auth.currentUser.photoURL || '',
      xp: 0,
      level: 1,
      badges: [],
      lastPlayed: new Date().toISOString(),
      role: 'client',
    };

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), newProfile);
      setUser(newProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${auth.currentUser.uid}`);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!auth.currentUser) return;
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${auth.currentUser.uid}`);
    }
  };

  return { 
    user: auth.currentUser, 
    storeUser,
    loading, 
    login, 
    logout, 
    createProfile,
    updateProfile
  };
}
