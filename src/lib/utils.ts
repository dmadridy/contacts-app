import { clsx, type ClassValue } from "clsx";
import type { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { twMerge } from "tailwind-merge";

import { db } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Phone formatting function: formats to (XXX) XXX-XXXX (for display only)
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Format based on length
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

// Strip formatting to get raw digits (for storage)
export function stripPhoneFormatting(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Creates or updates a user document in Firestore.
 * If the document doesn't exist, it creates it with createdAt.
 * If it exists, it updates it while preserving createdAt.
 */
export async function createOrUpdateUserDocument(user: User): Promise<void> {
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };

  if (!userDoc.exists()) {
    // Document doesn't exist, create it with createdAt
    await setDoc(userDocRef, {
      ...userData,
      createdAt: serverTimestamp(),
    });
  } else {
    // Document exists, update it while preserving createdAt
    await setDoc(userDocRef, userData, { merge: true });
  }
}
