import React, { useState, useEffect, useCallback } from 'react';
import Auth from './components/Auth';
import CourseMap from './components/CourseMap';
import Diary from './components/Diary';
import Profile from './components/Profile';
import Lesson from './components/Lesson';
import Layout, { type NavView } from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { I18nProvider, useI18n } from './lib/i18n';
import * as firebase from './services/firebase';
import type { User, UserData, Lesson as LessonType, Profile as ProfileType } from './types';

type View = NavView | 'lesson';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [view, setView] = useState<View>('map');
  const [currentLesson, setCurrentLesson] = useState<LessonType | null>(null);
  
  const { setLang } = useI18n();

  const handleLoginSuccess = async (loggedInUser: User) => {
    setLoading(true);
    setAuthError(null);
    try {
      await firebase.checkFirestoreHealth();
      const data = await firebase.getUserData(loggedInUser.uid);
      setUser(loggedInUser);
      setUserData(data);
      setLang(data.profile.currentLang);
    } catch (error: any) {
      console.error("Failed to connect or fetch user data:", error);
      await firebase.logout();
      setUser(null);
      setUserData(null);
      
      let errorMessage = "Ocorreu um erro desconhecido.";
      if (error.message.includes('health_check')) {
          errorMessage = "Falha na Conexão Fundamental: O app não consegue se conectar ao Firestore. Isso quase sempre é um erro de cópia no arquivo 'lib/firebaseConfig.ts'. Por favor, gere uma nova configuração no console do Firebase e cole-a para garantir 100% de precisão.";
      } else if (error.code === 'permission-denied') {
          errorMessage = "Conexão OK, mas Acesso Negado: Não foi possível carregar seus dados. A causa mais provável são as Regras de Segurança. Verifique se as regras para a coleção 'users' estão corretas no painel do Firebase.";
      } else {
        errorMessage = `Erro Inesperado: ${error.message}`;
      }
      setAuthError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const currentUser = await firebase.checkAuthState();
        if (currentUser) {
          await handleLoginSuccess(currentUser);
        } else {
           setLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setLoading(false);
      }
    };
    checkAuth();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await firebase.logout();
    setUser(null);
    setUserData(null);
    setView('map');
  };

  const handleSelectLesson = useCallback((lesson: LessonType) => {
    setCurrentLesson(lesson);
    setView('lesson');
  }, []);

  const handleBackToMap = useCallback(() => setView('map'), []);
  
  const handleUpdateUserData = useCallback(async (updates: Partial<UserData>) => {
    if (user && userData) {
        const newUserData = { ...userData, ...updates, profile: { ...userData.profile, ...updates.profile }, progress: { ...userData.progress, ...updates.progress }, diary: { ...userData.diary, ...updates.diary }};
        setUserData(newUserData);
        await firebase.updateUserData(user.uid, newUserData);
    }
  }, [user, userData]);

  const handleUpdateDiary = useCallback((entryId: string, text: string) => {
    if (userData) {
      const newDiary = { ...userData.diary, [entryId]: text };
      handleUpdateUserData({ diary: newDiary });
    }
  }, [userData, handleUpdateUserData]);

  const handleCompleteLesson = useCallback((lessonId: string) => {
     if (userData) {
      const newProgress = { ...userData.progress, [lessonId]: 'completed' as const };
      handleUpdateUserData({ progress: newProgress });
    }
  }, [userData, handleUpdateUserData]);
  
  const handleUpdateProfile = useCallback((newProfile: ProfileType) => {
    handleUpdateUserData({ profile: newProfile });
  }, [handleUpdateUserData]);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user || !userData) {
    return <Auth onLoginSuccess={handleLoginSuccess} initialError={authError} />;
  }
  
  if (view === 'lesson' && currentLesson) {
    return (
        <Lesson 
            lesson={currentLesson} 
            diary={userData.diary}
            progress={userData.progress}
            onUpdateDiary={handleUpdateDiary}
            onCompleteLesson={handleCompleteLesson}
            onBackToMap={handleBackToMap}
        />
    );
  }

  const navView = view === 'lesson' ? 'map' : view;

  const renderMainView = () => {
    switch (navView) {
      case 'map':
        return <CourseMap progress={userData.progress} onSelectLesson={handleSelectLesson} />;
      case 'diary':
        return <Diary diary={userData.diary} onUpdateDiary={handleUpdateDiary} />;
      case 'profile':
        return <Profile profile={userData.profile} progress={userData.progress} onUpdateProfile={handleUpdateProfile} />;
      default:
        return <CourseMap progress={userData.progress} onSelectLesson={handleSelectLesson} />;
    }
  };

  return (
    <Layout currentView={navView} onNavigate={(v) => setView(v)} onLogout={handleLogout}>
      {renderMainView()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;