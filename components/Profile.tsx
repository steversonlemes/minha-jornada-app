import React, { useState, useEffect } from 'react';
import type { Profile, Progress, Language } from '../types';
import { useI18n } from '../lib/i18n';
import { COURSE_MODULES } from '../constants';
import { EditIcon, CheckCircleIcon } from './Icons';

interface ProfileProps {
  profile: Profile;
  progress: Progress;
  onUpdateProfile: (newProfile: Profile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, progress, onUpdateProfile }) => {
  const { t, lang, setLang } = useI18n();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile>(profile);

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);
  
  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setLang(editedProfile.currentLang);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const completedModules = COURSE_MODULES.filter(module =>
    module.lessons.every(lesson => progress[lesson.id] === 'completed')
  );

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-400">{t('profile.title')}</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center space-x-2 text-amber-400 hover:text-amber-300">
            <EditIcon className="w-5 h-5" />
            <span>{t('profile.edit')}</span>
          </button>
        )}
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img src={editedProfile.userAvatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-amber-500" />
          <div className="flex-1 text-center md:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedProfile.userName}
                  onChange={(e) => setEditedProfile({ ...editedProfile, userName: e.target.value })}
                  className="w-full text-2xl font-bold p-2 bg-gray-900 border border-gray-600 rounded-md"
                />
                 <input
                  type="text"
                  value={editedProfile.userLevel}
                  onChange={(e) => setEditedProfile({ ...editedProfile, userLevel: e.target.value })}
                  className="w-full text-lg p-2 bg-gray-900 border border-gray-600 rounded-md"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold">{profile.userName}</h2>
                <p className="text-lg text-amber-300">{profile.userLevel}</p>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('profile.change_language')}</label>
             <select
              value={editedProfile.currentLang}
              onChange={(e) => setEditedProfile({ ...editedProfile, currentLang: e.target.value as Language })}
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4 mt-6">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md">{t('profile.cancel')}</button>
          <button onClick={handleSave} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-md">{t('profile.save')}</button>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-amber-400 mb-4">{t('profile.skills_badges')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {completedModules.length > 0 ? (
            completedModules.map(module => (
              <div key={module.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="font-semibold">{module.title[lang]}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">{t('profile.no_badges')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);