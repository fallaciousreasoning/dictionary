import * as fs from 'fs';
import { JSDOM } from 'jsdom';

const inputFile = "../gcide/CIDE.X";

const loadFileToDom = (fileName: string) => {
    const text = fs.readFileSync(fileName);
    const dom = new JSDOM(text); 
    return dom.window.document;
}

const paragraphs = loadFileToDom(inputFile).querySelectorAll('p');
console.log(paragraphs.length);