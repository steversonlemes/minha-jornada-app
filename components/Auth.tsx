import React, { useState, useEffect } from 'react';
import { useI18n } from '../lib/i18n';
import * as firebase from '../services/firebase';
import type { User } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { firebaseConfig } from '../lib/firebaseConfig';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
  initialError?: string | null;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess, initialError }) => {
  const { t } = useI18n();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState<string | null>(initialError || null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setError(initialError || null);
  }, [initialError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        const user = await firebase.login(email, password);
        onLoginSuccess(user);
      } else {
        if (!name || !level) {
            setError("Nome e Nível são obrigatórios para o registro.");
            setLoading(false);
            return;
        }
        const user = await firebase.register(name, level, email, password);
        onLoginSuccess(user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
      return <LoadingSpinner message={t('auth.loading')} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md p-6 space-y-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        
        <h1 className="text-3xl font-bold text-center text-amber-400">
          {isLogin ? t('login.title') : t('register.title')}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">{t('auth.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-300">{t('auth.level')}</label>
                <input
                  id="level"
                  name="level"
                  type="text"
                  required
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('auth.email')}</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">{t('auth.password')}</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-100 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {error && (
             <div className="p-4 bg-red-900/50 border border-red-700 rounded-md text-center">
                <p className="text-sm font-medium text-red-300">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-amber-600 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-gray-800 transition-colors"
            >
              {isLogin ? t('login.button') : t('register.button')}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="text-sm text-amber-400 hover:underline">
            {isLogin ? t('auth.toggle_to_register') : t('auth.toggle_to_login')}
          </button>
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-700 text-center text-xs text-gray-500">
            <p>{t('auth.project_id')}</p>
            <p className="font-mono bg-gray-900 px-2 py-1 rounded-md mt-1 inline-block">{firebaseConfig.projectId}</p>
        </div>

      </div>
    </div>
  );
};

export default Auth;