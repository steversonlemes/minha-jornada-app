export type Language = 'pt' | 'en' | 'es';

export interface Profile {
  userName: string;
  userLevel: string;
  userAvatarUrl: string;
  currentLang: Language;
}

export interface Progress {
  [lessonId: string]: 'completed';
}

export interface Diary {
  [diaryEntryId: string]: string; // e.g., 'm1l1_dissertation1': 'My thoughts...'
}

export interface UserData {
  profile: Profile;
  progress: Progress;
  diary: Diary;
}

export interface User {
  uid: string;
  email: string;
}

export interface QuizQuestion {
  id: string;
  question: { [key in Language]: string };
  options: { [key in Language]: string[] };
  correctAnswerIndex: number;
}

export interface StudyGuide {
  shortAnswerQuestions: {
    id: string;
    question: { [key in Language]: string };
    answer: { [key in Language]: string };
  }[];
  dissertationQuestions: {
    id: string;
    question: { [key in Language]: string };
  }[];
  glossary: {
    id: string;
    term: { [key in Language]: string };
    definition: { [key in Language]: string };
  }[];
  quiz: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: { [key in Language]: string };
  summary: { [key in Language]: string };
  podcastUrl: string;
  videoUrl: string;
  studyGuide: StudyGuide;
}

export interface Module {
  id: string;
  title: { [key in Language]: string };
  lessons: Lesson[];
}