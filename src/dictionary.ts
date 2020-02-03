import localForage from 'localforage';

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
        const dictionaryResponse = await fetch(dictionaryName);
        if (!dictionaryResponse.ok)
            return {};

        // Save the dictionary to disk.
        rawText = await dictionaryResponse.text();

        await localForage.setItem(dictionaryName, rawText);
    }
    
    return JSON.parse(rawText);
}

export const ensureLoaded = () => new Promise(async (resolve, reject) => {
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

    resolve();
});

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

export const findByRegex = async (regex: RegExp | string, maxResults = 100) => {
    if (typeof regex === 'string')
        regex = new RegExp(regex, 'i');

    await ensureLoaded();

    let result: string[] = [];
    for (const word of words) {
        if (regex.test(word))
            result.push(word);

        if (result.length >= maxResults)
            break;
    }

    return result.map(r => entries[r]);
}
window['findByRegex'] = findByRegex;