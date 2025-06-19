import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import resources from './resources';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US',
  compatibilityJSON: 'v4',
  keySeparator: '.', //t('home.header.title') // => { home: { header: { title: '...' } } }
  returnNull: false,
  nsSeparator: false, //i18n không dùng namespace phân tách key, "common:title" sẽ bị chia thành namespace = "common"
  returnEmptyString: false,

  interpolation: {
    prefix: '%{',
    suffix: '}',
    escapeValue: false,
  },
  parseMissingKeyHandler(key, defaultValue) {
    const keySeparator = '~~';
    const value = key.includes(keySeparator) ? key.split(keySeparator)[1] : key;

    return value;
  },
});

export default i18n;
