export interface Definition {
    word: string;
    headword?: string;
    pronunciation?: string;
    partOfSpeech?: string;
    definitions: string[];
    alternateSpellings: string[];
    synonyms: string[];
    antonyms: string[];
}