'use client'
import { useTranslation } from 'react-i18next'

import FlagFR from '../atoms/flags/FlagFR'
import FlagEN from '../atoms/flags/FlagEN'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: 'en' | 'fr') => {
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng) // on force dans le localStorage
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-2 py-1 ${i18n.language === 'fr' ? 'font-bold' : ''}`}
      >
        <FlagFR width="23" height="23" />
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 ${i18n.language === 'en' ? 'font-bold' : ''}`}
      >
        <FlagEN width="23" height="23" />
      </button>
    </div>
  )
}
