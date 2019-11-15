export const words: string[] = [];
window['words'] = words;

export const entries: {
    [word: string]: {
        word: string;
        definitions: string[];
    }
} = {};
window['entries'] = entries;

export const ensureLoaded = () => new Promise(async (resolve, reject) => {
    // If we have words, return.
    if (words.length) {
        resolve();
        return;
    }

    const dictionaryResponse = await fetch('/dictionary.json');
    const json = await dictionaryResponse.json();

    for (const word in json) {
        words.push(word);
        entries[word] = json[word];
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