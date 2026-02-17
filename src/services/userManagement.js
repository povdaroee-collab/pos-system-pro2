import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

// ទាញយក Config ពី Environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// 1. បង្កើត App ទីពីរ ដើម្បីបង្កើត User ដោយមិន Logout Owner
const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
const secondaryAuth = getAuth(secondaryApp);

// យើងប្រើ Database ដើម (Main App) ដើម្បីរក្សាទុកទិន្នន័យ
import { db } from "./firebase"; // ហៅ db ពី file firebase.js ដើមរបស់អ្នក

export const createAdminAccount = async (userData) => {
  const { email, password, fullName, username, telegram, profileUrl } = userData;

  try {
    // 2. បង្កើត Authentication User ក្នុង App ទីពីរ
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const newUser = userCredential.user;

    // 3. សរសេរទិន្នន័យចូល Firestore (users collection)
    // ប្រើ UID របស់ User ដែលទើបបង្កើត
    await setDoc(doc(db, "users", newUser.uid), {
      uid: newUser.uid,
      fullName: fullName,
      username: username,
      email: email,
      telegram: telegram,
      photoURL: profileUrl || "", // ដាក់រូបភាពបើមាន
      role: "admin", // កំណត់ Role ជា Admin
      createdAt: serverTimestamp(),
      createdBy: "owner" // ដឹងថាអ្នកណាបង្កើត
    });

    // 4. Logout ចេញពី App ទីពីរភ្លាមៗ ដើម្បីកុំឱ្យច្រឡំ
    await signOut(secondaryAuth);

    return true;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};