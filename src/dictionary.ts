import localForage from 'localforage';
import stem from 'stem-porter';
import stringSimilarity from 'string-similarity';

const dictionaryName = 'dictionary.json';

export interface Definition {
    word: string;
    definition: string;
    antonyms: string[];
    synonyms: string[];
    alternateSpellings: string[];
}

export type Entry = Definition[] & { word: string };

export const words: string[] = [];
window['words'] = words;

export const entries: {
    [word: string]: Entry;
} = {};
window['entries'] = entries;

const getRawWords = async () => {
    let rawText = await localForage.getItem<string>(dictionaryName);
    if (!rawText) {
        const dictionaryResponse = await fetch('./' + dictionaryName);
        if (!dictionaryResponse.ok)
            return {};

        // Save the dictionary to disk.
        rawText = await dictionaryResponse.text();

        await localForage.setItem(dictionaryName, rawText);
    }

    return JSON.parse(rawText);
}

let dictionaryLoadPromise: Promise<void>;
export const ensureLoaded = async () => {
    if (!dictionaryLoadPromise) {
        dictionaryLoadPromise = new Promise(async (resolve, reject) => {
            // If we have words, return.
            if (words.length) {
                resolve();
                return;
            }

            const rawWords = await getRawWords();

            for (const word in rawWords) {
                words.push(word);
                entries[word] = rawWords[word];
                entries[word].word = word;
            }

            words.sort();

            // For debugging.
            globalThis.words = words;
            globalThis.entries = entries;

            resolve();
        });
    }
    return dictionaryLoadPromise;
}

export const wordExists = async (word: string) => {
    await ensureLoaded();

    return !!entries[word];
}

export const findByWildCard = (search: string) => {
    const regexString = search
        // * ==> (.*)
        .split('*').join('.*')
        // ? ==> .
        .split('?').join('.');
    return findByRegex(regexString);
}
window['findByWildcard'] = findByWildCard;

class MatchList {
    results: { word: string, matchGoodness: number }[];
    maxResults: number;

    constructor(maxResults: number) {
        this.results = [];
        this.maxResults = maxResults;
    }

    addResult(word: string, matchPosition: number) {
        let insertionIndex = 0;
        while (insertionIndex < this.results.length
            && this.results[insertionIndex].matchGoodness <= matchPosition) {
            insertionIndex++;
        }

        this.results.splice(insertionIndex, 0, { word, matchGoodness: matchPosition })

        // If we have too many results, remove the last one.
        if (this.results.length > this.maxResults)
            this.results.pop();
    }

    toEntries() {
        return this.results.map(r => entries[r.word]);
    }
}

export const didYouMean = async (query: string, maxResults = 5) => {
    const matches = new MatchList(maxResults);
    for (const word of words) {
        const similarity = stringSimilarity.compareTwoStrings(query, word);
        matches.addResult(word, -similarity);
    }

    return matches.toEntries();
}

export const findByRegex = async (regex: RegExp | string, maxResults = 100) => {
    if (typeof regex === 'string')
        regex = new RegExp(regex, 'i');

    await ensureLoaded();

    const matches = new MatchList(maxResults);
    for (const word of words) {
        const match = regex.exec(word);
        if (!match) continue;

        matches.addResult(word, match.index);
    }

    const result = matches.toEntries();
    if (result.length !== 0)
      return result;

    // If the word is already stemmed, see if we can find anything similar.
    const stemmed = stem(regex.source);
    if (stemmed == regex.source)
      return didYouMean(regex.source);

    return findByRegex(stemmed, maxResults);
}
window['findByRegex'] = findByRegex;