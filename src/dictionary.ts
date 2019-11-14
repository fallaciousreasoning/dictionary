import * as JSONStream from 'JSONStream';

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

    const wordsSet = new Set<string>();

    const dictionaryResponse = await fetch('/dictionary.json');
    if (!dictionaryResponse.body) {
        reject("Response had no body!");
        return;
    }

    const stream = JSONStream.parse("words.*");
    stream.on('data', entry => {
        wordsSet.add(entry.word);
        entries[entry.word] = entry;
    });

    const reader = await dictionaryResponse.body.getReader();
    let done = false;

    while (!done) {
        done = await reader.read().then(({ done, value }) => {
            const text = new TextDecoder("utf-8").decode(value);
            stream.write(text);

            if (done) {
                words.push(...Array.from(wordsSet));
                resolve();
            }

            return done;
        });
    }
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
        regex = new RegExp(regex);

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