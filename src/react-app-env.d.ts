// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />

export type SearchCriteria = {
  keywords: string;
  engine: number;
}

export type ResultProps = {
  status: LoadStatus;
  ranking: Ranking | null;
  errors: string[];
}
export type ListProps = {
  items: any[];
}

export type SearchProps = {
  Search(criteria: SearchCriteria): void;
}

export type Ranking = {
  positions: number[];
  keyWords: string;
  searchEngine: number;
}
