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
    const dictionaryResponse = await fetch('/dictionary.json');
    if (!dictionaryResponse.body) {
        reject("Response had no body!");
        return;
    }

    const stream = JSONStream.parse("words.*");
    stream.on('data', entry => {
        words.push(entry.word);
        entries[entry.word] = entry;
    });

    const reader = await dictionaryResponse.body.getReader();
    let done = false;

    while (!done) {
        done = await reader.read().then(({ done, value }) => {
            const text = new TextDecoder("utf-8").decode(value);
            stream.write(text);

            if (done)
                resolve();

            return done;
        });
    }
});