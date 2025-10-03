import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// =====================================================================================
// AÇÃO NECESSÁRIA: Substitua o objeto de exemplo abaixo pelas chaves do SEU projeto.
// Você encontra esses valores nas configurações do seu projeto no console do Firebase.
// =====================================================================================
// FIX: Export firebaseConfig to make it available for import in other modules.
export const firebaseConfig = {
  apiKey: "AIzaSyC26_6RAzyVrHaCLmq4FFPgyGgGO5pqAEQ",
  authDomain: "jornada-do-lider-app.firebaseapp.com",
  projectId: "jornada-do-lider-app",
  storageBucket: "jornada-do-lider-app.firebasestorage.app",
  messagingSenderId: "2371639023",
  appId: "1:2371639023:web:6d1988e4b43857fffa6d1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services we will use
export const auth = getAuth(app);
export const db = getFirestore(app);