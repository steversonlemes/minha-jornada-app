import React, { createContext, useContext, ReactNode, useState } from 'react';
import type { Language } from '../types';

const translations = {
  pt: {
    // Auth
    'login.title': 'Entrar',
    'login.button': 'Entrar',
    'register.title': 'Registrar',
    'register.button': 'Registrar',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.name': 'Nome',
    'auth.level': 'Nível ou Cargo',
    'auth.toggle_to_register': 'Não tem uma conta? Registre-se',
    'auth.toggle_to_login': 'Já tem uma conta? Entre',
    'auth.loading': 'Verificando...',
    'auth.logout': 'Sair',
    'auth.project_id': 'Conectando ao Projeto ID:',
    // Navigation
    'nav.map': 'Mapa',
    'nav.diary': 'Diário de Bordo',
    'nav.profile': 'Perfil',
    // Map
    'map.title': 'Mapa da Jornada',
    'map.completed': 'Concluído',
    'map.next_lesson': 'Próxima Aula',
    // Lesson
    'lesson.summary': 'Resumo',
    'lesson.podcast': 'Podcast',
    'lesson.video': 'Vídeo',
    'lesson.study_guide': 'Guia de Estudos',
    // Study Guide
    'sg.short_answer': 'Perguntas de Resposta Curta',
    'sg.dissertation': 'Questões para Dissertação',
    'sg.glossary': 'Glossário',
    'sg.quiz': 'Quiz',
    'sg.your_notes_here': 'Escreva suas reflexões aqui... Salvo automaticamente.',
    // Quiz
    'quiz.submit': 'Enviar Respostas',
    'quiz.retake': 'Refazer Quiz',
    'quiz.passed': 'Aprovado! Aula concluída.',
    'quiz.failed': 'Não foi desta vez. Tente novamente!',
    'quiz.score': 'Sua pontuação: {{score}}%',
    'quiz.passing_score': 'Pontuação para aprovação: 80%',
    // Diary
    'diary.title': 'Diário de Bordo',
    'diary.filter_by_lesson': 'Filtrar por aula',
    'diary.all_lessons': 'Todas as Aulas',
    'diary.no_notes': 'Você ainda não fez nenhuma anotação para esta aula.',
    'diary.edit_your_notes': 'Edite suas anotações aqui...',
    // Profile
    'profile.title': 'Perfil do Líder',
    'profile.edit': 'Editar Perfil',
    'profile.save': 'Salvar Alterações',
    'profile.cancel': 'Cancelar',
    'profile.skills_badges': 'Habilidades e Conquistas',
    'profile.no_badges': 'Conclua os módulos para ganhar conquistas!',
    'profile.change_language': 'Mudar Idioma',
    // Loading Quotes
    'loading.quote1': 'Liderança é a capacidade de transformar visão em realidade.',
    'loading.quote2': 'Um líder é aquele que conhece o caminho, segue o caminho e mostra o caminho.',
    'loading.quote3': 'O maior líder não é necessariamente aquele que faz as maiores coisas. Ele é aquele que faz com que as pessoas façam as maiores coisas.',
    'loading.quote4': 'Inovação distingue um líder de um seguidor.',
  },
  en: {
    // Auth
    'login.title': 'Login',
    'login.button': 'Login',
    'register.title': 'Register',
    'register.button': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.level': 'Level or Position',
    'auth.toggle_to_register': "Don't have an account? Register",
    'auth.toggle_to_login': 'Already have an account? Login',
    'auth.loading': 'Verifying...',
    'auth.logout': 'Logout',
    'auth.project_id': 'Connecting to Project ID:',
    // Navigation
    'nav.map': 'Map',
    'nav.diary': 'Logbook',
    'nav.profile': 'Profile',
    // Map
    'map.title': "Leader's Journey Map",
    'map.completed': 'Completed',
    'map.next_lesson': 'Next Lesson',
    // Lesson
    'lesson.summary': 'Summary',
    'lesson.podcast': 'Podcast',
    'lesson.video': 'Video',
    'lesson.study_guide': 'Study Guide',
    // Study Guide
    'sg.short_answer': 'Short Answer Questions',
    'sg.dissertation': 'Dissertation Questions',
    'sg.glossary': 'Glossary',
    'sg.quiz': 'Quiz',
    'sg.your_notes_here': 'Write your reflections here... Saved automatically.',
    // Quiz
    'quiz.submit': 'Submit Answers',
    'quiz.retake': 'Retake Quiz',
    'quiz.passed': 'Passed! Lesson completed.',
    'quiz.failed': 'Not this time. Try again!',
    'quiz.score': 'Your score: {{score}}%',
    'quiz.passing_score': 'Passing score: 80%',
    // Diary
    'diary.title': 'Logbook',
    'diary.filter_by_lesson': 'Filter by lesson',
    'diary.all_lessons': 'All Lessons',
    'diary.no_notes': 'You have not written any notes for this lesson yet.',
    'diary.edit_your_notes': 'Edit your notes here...',
    // Profile
    'profile.title': 'Leader Profile',
    'profile.edit': 'Edit Profile',
    'profile.save': 'Save Changes',
    'profile.cancel': 'Cancel',
    'profile.skills_badges': 'Skills & Badges',
    'profile.no_badges': 'Complete modules to earn badges!',
    'profile.change_language': 'Change Language',
    // Loading Quotes
    'loading.quote1': 'Leadership is the capacity to translate vision into reality.',
    'loading.quote2': 'A leader is one who knows the way, goes the way, and shows the way.',
    'loading.quote3': 'The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.',
    'loading.quote4': 'Innovation distinguishes between a leader and a follower.',
  },
  es: {
    // Auth
    'login.title': 'Iniciar Sesión',
    'login.button': 'Iniciar Sesión',
    'register.title': 'Registrarse',
    'register.button': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre',
    'auth.level': 'Nivel o Cargo',
    'auth.toggle_to_register': '¿No tienes una cuenta? Regístrate',
    'auth.toggle_to_login': '¿Ya tienes una cuenta? Inicia Sesión',
    'auth.loading': 'Verificando...',
    'auth.logout': 'Cerrar Sesión',
    'auth.project_id': 'Conectando al Proyecto ID:',
    // Navigation
    'nav.map': 'Mapa',
    'nav.diary': 'Bitácora',
    'nav.profile': 'Perfil',
    // Map
    'map.title': 'Mapa del Viaje',
    'map.completed': 'Completado',
    'map.next_lesson': 'Próxima Lección',
    // Lesson
    'lesson.summary': 'Resumen',
    'lesson.podcast': 'Podcast',
    'lesson.video': 'Video',
    'lesson.study_guide': 'Guía de Estudio',
    // Study Guide
    'sg.short_answer': 'Preguntas de Respuesta Corta',
    'sg.dissertation': 'Preguntas de Disertación',
    'sg.glossary': 'Glosario',
    'sg.quiz': 'Examen',
    'sg.your_notes_here': 'Escribe tus reflexiones aquí... Guardado automático.',
    // Quiz
    'quiz.submit': 'Enviar Respuestas',
    'quiz.retake': 'Repetir Examen',
    'quiz.passed': '¡Aprobado! Lección completada.',
    'quiz.failed': 'Esta vez no. ¡Inténtalo de nuevo!',
    'quiz.score': 'Tu puntuación: {{score}}%',
    'quiz.passing_score': 'Puntuación para aprobar: 80%',
    // Diary
    'diary.title': 'Bitácora',
    'diary.filter_by_lesson': 'Filtrar por lección',
    'diary.all_lessons': 'Todas las Lecciones',
    'diary.no_notes': 'Aún no has escrito ninguna nota para esta lección.',
    'diary.edit_your_notes': 'Edita tus notas aquí...',
    // Profile
    'profile.title': 'Perfil del Líder',
    'profile.edit': 'Editar Perfil',
    'profile.save': 'Guardar Cambios',
    'profile.cancel': 'Cancelar',
    'profile.skills_badges': 'Habilidades e Insignias',
    'profile.no_badges': '¡Completa módulos para ganar insignias!',
    'profile.change_language': 'Cambiar Idioma',
    // Loading Quotes
    'loading.quote1': 'Liderazgo es la capacidad de transformar la visión en realidad.',
    'loading.quote2': 'Un líder es aquel que conoce el camino, anda en el camino y muestra el camino.',
    'loading.quote3': 'El mejor líder no es necesariamente el que hace las cosas más grandes. Es el que consigue que la gente haga las cosas más grandes.',
    'loading.quote4': 'La innovación distingue a un líder de un seguidor.',
  },
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.pt, params?: Record<string, string>) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children, initialLang = 'pt' }: { children: ReactNode, initialLang?: Language }) => {
  const [lang, setLang] = useState<Language>(initialLang);

  const t = (key: keyof typeof translations.pt, params?: Record<string, string>) => {
    let translation = translations[lang]?.[key] || translations['pt'][key] || key;
    if (params) {
      Object.keys(params).forEach(pKey => {
        translation = translation.replace(`{{${pKey}}}`, params[pKey]);
      });
    }
    return translation;
  };

  return React.createElement(I18nContext.Provider, { value: { lang, setLang, t } }, children);
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};