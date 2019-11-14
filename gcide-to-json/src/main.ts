import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Definition } from './definition';

const letter = "X"
const inputFile = `../gcide/CIDE.${letter}`;
const outputFile = `output/${letter}.json`

if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
}

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

const document = loadFileToDom(inputFile);
const paragraphs = document.querySelectorAll('body > * > p');
const definitions = [];
for (const paragraph of paragraphs) {
    const definition = parseDefinition(paragraph);
    if (!definition)
      continue;
      
    definitions.push(definition);
}

saveToJson(outputFile, definitions);

