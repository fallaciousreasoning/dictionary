import localForage from 'localforage';
console.log(globalThis)

const dictionaryName = 'dictionary.json';

export const words: string[] = [];
window['words'] = words;

export const entries: {
    [word: string]: {
        word: string;
        definitions: string[];
    }
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
    results: { word: string, matchPosition: number }[];
    maxResults: number;

    constructor(maxResults: number) {
        this.results = [];
        this.maxResults = maxResults;
    }

    addResult(word: string, matchPosition: number) {
        let insertionIndex = 0;
        while (insertionIndex < this.results.length
            && this.results[insertionIndex].matchPosition <= matchPosition) {
            insertionIndex++;
        }

        this.results.splice(insertionIndex, 0, { word, matchPosition })

        // If we have too many results, remove the last one.
        if (this.results.length > this.maxResults)
            this.results.pop();
    }

    toEntries() {
        return this.results.map(r => entries[r.word]);
    }
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

    return matches.toEntries();
}
window['findByRegex'] = findByRegex;