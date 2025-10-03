import { auth, db } from '../lib/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import type { User, UserData, Profile } from '../types';

export const checkFirestoreHealth = async (): Promise<void> => {
    try {
        await getDoc(doc(db, 'health_check', 'status'));
    } catch (error: any) {
        console.error("Health check failed:", error);
        throw new Error(`Health check failed for path /health_check/status. Original error: ${error.message}`);
    }
};

export const checkAuthState = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      unsubscribe(); 
      if (user) {
        resolve({ uid: user.uid, email: user.email! });
      } else {
        resolve(null);
      }
    }, (error) => {
        console.error("onAuthStateChanged error:", error);
        reject(error);
    });
  });
};

export const login = async (email: string, password_raw: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password_raw);
        const user = userCredential.user;
        return { uid: user.uid, email: user.email! };
    } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
        }
        throw new Error('Ocorreu um erro ao tentar fazer login.');
    }
};

export const register = async (name: string, level: string, email: string, password_raw: string): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password_raw);
        const newUser = userCredential.user;

        const defaultProfile: Profile = {
            userName: name,
            userLevel: level,
            userAvatarUrl: `https://api.dicebear.com/8.x/adventurer/svg?seed=${encodeURIComponent(name)}`,
            currentLang: 'pt',
        };

        const newUserData: UserData = {
            profile: defaultProfile,
            progress: {},
            diary: {},
        };

        await setDoc(doc(db, 'users', newUser.uid), newUserData);

        return { uid: newUser.uid, email: newUser.email! };
    } catch (error: any) {
        console.error("Registration Error:", error); 
        if (error.code) { 
            switch (error.code) {
                case 'auth/email-already-in-use':
                    throw new Error('Este e-mail já está em uso por outra conta.');
                case 'auth/weak-password':
                    throw new Error('A senha é muito fraca. Use pelo menos 6 caracteres.');
                case 'auth/invalid-email':
                    throw new Error('O formato do e-mail é inválido.');
                case 'permission-denied':
                    throw new Error('Falha ao criar o perfil. Verifique as regras de segurança do Firestore.');
                default:
                    throw new Error(`Ocorreu um erro ao registrar (${error.code})`);
            }
        }
        throw new Error('Ocorreu um erro desconhecido ao registrar.');
    }
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};

export const getUserData = async (uid: string): Promise<UserData> => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserData;
        } else {
            throw new Error('Dados do usuário não encontrados no banco de dados.');
        }
    } catch (error: any) {
        console.error("Firestore getData error:", error);
        throw error;
    }
};

export const updateUserData = (uid: string, data: UserData): Promise<void> => {
    const userDocRef = doc(db, 'users', uid);
    return setDoc(userDocRef, data);
};