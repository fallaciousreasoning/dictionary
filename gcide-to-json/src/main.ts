import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Definition } from './definition';

const letters = "X";//"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const outputFile = `dictionary.json`

const loadFileToDom = (fileName: string) => {
    const text = fs.readFileSync(fileName);
    const dom = new JSDOM(text); 
    return dom.window.document;
}

const saveToJson = (fileName: string, definitions: Definition[]) => {
    const json = JSON.stringify(definitions, null, 4);
    fs.writeFileSync(fileName, json);
}

const parseDefinition = (fromParagraph: Element): Definition => {
    const word = fromParagraph.querySelector('ent');
    if (!word)
      return;

    const headword = fromParagraph.querySelector('hw');
    const pronunciation = fromParagraph.querySelector('pr');
    const definitions = fromParagraph.querySelectorAll('def');

    return {
        word: word && word.innerHTML,
        definitions: Array.from(definitions).map(m => m.innerHTML),
        headword: headword && headword.innerHTML,
        pronunciation: pronunciation && pronunciation.innerHTML
    }
}

const definitions: Definition[] = [];

const addDefinitionsForLetter = (letter: string) => {
    const inputFile = `../gcide/CIDE.${letter}`;
    const document = loadFileToDom(inputFile);
    const paragraphs = document.querySelectorAll('body > * > p');
    for (const paragraph of paragraphs) {
        const definition = parseDefinition(paragraph);
        if (!definition)
          continue;
    
        definitions.push(definition);
    }
}

for (const letter of letters) {
    console.log("Parsing", letter);
    addDefinitionsForLetter(letter);
    console.log("Parsed", letter);
}

saveToJson(outputFile, definitions);

