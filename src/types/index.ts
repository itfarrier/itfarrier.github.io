import { Language } from 'cmpts/LanguageContext';

export interface ILangObject {
  langKey: Language;
  link: string;
  selected: boolean;
}

export type CommonObject = Record<string, unknown>;
