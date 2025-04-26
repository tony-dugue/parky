'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import frCommon from './locales/fr/common.json'

const resources = {
  en: { translation: enCommon },
  fr: { translation: frCommon },
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // langue par défaut
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'], // d'abord localStorage, puis navigateur
        caches: ['localStorage'],
      },
      initImmediate: false, // IMPORTANT pour Next App Router
    })
}

export default i18n
