import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Definition } from './definition';

const letters = "A";//"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const outputFile = `dictionary.json`

const loadFileToDom = (fileName: string) => {
    const text = fs.readFileSync(fileName).toString()
        // GCIDE doesn't escape their breaks properly.
        .replace(/<br\//g, "<br>");
    const dom = new JSDOM(text); 
    return dom.window.document;
}

const saveToJson = (fileName: string, definitions: Definition[]) => {
    const json = JSON.stringify(definitions, null, 4);
    fs.writeFileSync(fileName, json);
}

const parseDefinition = (fromParagraph: Element): Definition => {
    fromParagraph.outerHTML = fromParagraph.outerHTML.replace(/\<br\//g, "<br>");
    const word = fromParagraph.querySelector('ent');
    if (!word)
      return;

    const headword = fromParagraph.querySelector('hw');
    const pronunciation = fromParagraph.querySelector('pr');
    const partOfSpeech = fromParagraph.querySelector('pos');
    const definitions = fromParagraph.querySelectorAll('def');
    const synonyms = fromParagraph.querySelectorAll('syn');
    if (word.innerHTML == "0") {
        console.log("Found synonyms!", fromParagraph.outerHTML);
    }
    const antonyms = fromParagraph.querySelectorAll('ant');
    const alternateSpellings = fromParagraph.querySelectorAll('asp');

    return {
        word: word && word.innerHTML,
        definitions: Array.from(definitions).map(m => m.innerHTML),
        headword: headword && headword.innerHTML,
        pronunciation: pronunciation && pronunciation.innerHTML,
        partOfSpeech: partOfSpeech && partOfSpeech.innerHTML,
        synonyms: Array.from(synonyms).map(s => s.innerHTML),
        antonyms: Array.from(antonyms).map(a => a.innerHTML),
        alternateSpellings: Array.from(alternateSpellings).map(a => a.innerHTML)
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

