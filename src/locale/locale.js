import en from './en'
import ru from './ru'
import zh from './zh'
import Store from '../store';

const localeObj = {
    'en':en,
    'ru':ru,
    'zh':zh
}

function locale(){
    return localeObj[Store.lang];
}

export default locale;