import { Link } from 'cmpts/HeaderLink/types';
import { Language } from 'cmpts/LanguageContext';

declare module '*.pdf' {
  const pdf: Link;

  export default pdf;
}

export interface ILangObject {
  langKey: Language;
  link: string;
  selected: boolean;
}
