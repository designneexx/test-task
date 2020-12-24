export interface SearchWords {
  query: {
    limit: number;
    page: number;
  };
  results: {
    total: number;
    data: string[];
  };
}

export interface DetailWord {
  definition: string;
  partOfSpeech: string;
  synonyms?: string[];
}

export interface Word {
  word: string;
  syllables: {
    count: number;
    list: string[];
  };
  pronunciation?: {
    all: string;
  };
  frequency?: number;
  results?: DetailWord[];
}

export interface WordView extends Word {
  results: DetailWord[];
}
