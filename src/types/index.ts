import type { Language } from 'cmpts/LanguageContext';
import type { AllMarkdownContentQuery } from 'root/graphql-types';
import type { EDGE_TYPES } from 'src/constants';

export type CommonObject = Record<string, unknown>;

export type Edge = ElementTypeOfArray<AllMarkdownContentQuery['allMarkdownRemark']['edges']>;

export type EdgeLanguage = Edge['node']['fields']['langKey'];

export type EdgeType = Edge['node']['frontmatter']['type'] | EDGE_TYPES;

export type ElementTypeOfArray<T> = T extends (infer U)[] ? U : T;

export type GroupedByLanguage = Record<EdgeLanguage, Edge[]>;

export type GroupedByTypeAndLanguage = Record<EdgeType, GroupedByLanguage>;

export interface ILangObject {
  langKey: Language;
  link: string;
  selected: boolean;
}
