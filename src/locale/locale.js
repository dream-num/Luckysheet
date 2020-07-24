import en from './en'
import zh from './zh'
import Store from '../store';

const localeObj = {
    'en':en,
    'zh':zh
}

function locale(){
    return localeObj[Store.lang];
}

export default locale;