import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Definition } from './definition';

const outputFile = `dictionary.json`

const loadFileToDom = (fileName: string) => {
    const text = fs.readFileSync(fileName).toString()
        // GCIDE doesn't escape their breaks properly.
        .replace(/<br\//g, "<br>");
    const dom = new JSDOM(text); 
    return dom;
}

const saveToJson = (fileName: string, definitions: Definition[]) => {
    const json = JSON.stringify({ words: definitions }, null, 4);
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
    const antonyms = fromParagraph.querySelectorAll('ant');
    const alternateSpellings = fromParagraph.querySelectorAll('asp');

    return {
        word: word && word.innerHTML.toString(),
        definitions: Array.from(definitions).map(m => m.innerHTML.toString()),
        headword: headword && headword.innerHTML.toString(),
        pronunciation: pronunciation && pronunciation.innerHTML.toString(),
        partOfSpeech: partOfSpeech && partOfSpeech.innerHTML.toString(),
        synonyms: Array.from(synonyms).map(s => s.innerHTML.toString()),
        antonyms: Array.from(antonyms).map(a => a.innerHTML.toString()),
        alternateSpellings: Array.from(alternateSpellings).map(a => a.innerHTML.toString())
    }
}

const getDefinitionsFor = (letter: string) => {
    const definitions = [];
    const inputFile = `../gcide/CIDE.${letter}`;
    const result = loadFileToDom(inputFile);
    
    const document = result.window.document;
    const paragraphs = document.querySelectorAll('body > * > p');
    for (const paragraph of paragraphs) {
        const definition = parseDefinition(paragraph);
        if (!definition)
          continue;
    
        definitions.push(definition);
    }
    return definitions;
}

const parseAndSaveLetter = (letter: string) => {
    console.log("Parsing", letter);
    const definitions = getDefinitionsFor(letter);
    console.log("Parsed!");

    console.log("Saving...");
    for (const definition of definitions) {
        fs.appendFileSync(outputFile, JSON.stringify(definition) + ',\n');
    }
}

console.log("Args", process.argv);

// Start JSON file
if (process.argv[2] === "start") {
    fs.writeFileSync(outputFile, `{ "words": [\n`);
    console.log("Started!");
}

// Append a letter
if (process.argv[2] === "append") {
    parseAndSaveLetter(process.argv[3]);
    console.log("Appended", process.argv[3]);
}

// End json file
if (process.argv[2] === "end") {
    fs.appendFileSync(outputFile, "\n] }");
    console.log("Ended!");
}

