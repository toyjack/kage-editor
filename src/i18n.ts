import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import args from "./args";
import store from './store';

import jaTranslation from './locales/ja.json';
import enTranslation from './locales/en.json';
import koTranslation from './locales/ko.json';
import zhCNTranslation from './locales/zh_CN.json';
import zhTWTranslation from './locales/zh_TW.json';

const resources = {
  "ja": {
    translation: jaTranslation,
  },
  "en": {
    translation: enTranslation,
  },
  "ko": {
    translation: koTranslation,
  },
  "zh-Hans": {
    translation: zhCNTranslation,
  },
  "zh-Hant": {
    translation: zhTWTranslation,
  },
};

let lng = 'ja';
lng = store.getState().args.lang;
// switch (args.host.split('.')[0]) {
//   case 'en':
//     lng = 'en';
//     break;
//   case 'ko':
//     lng = 'ko';
//     break;
//   case 'zhs':
//     lng = 'zh-Hans';
//     break;
//   case 'zht':
//     lng = 'zh-Hant';
//     break;
// }

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng,
    fallbackLng: {
      'zh-Hans': ['zh-Hant', 'ja'],
      'zh-Hant': ['zh-Hans', 'ja'],
      'default': ['ja'],
    },

    returnObjects: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
