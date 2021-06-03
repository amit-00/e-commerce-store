import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
      
  }, [user]);

  return { user };
}