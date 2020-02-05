import { createPopper } from '@popperjs/core';
import { useState, useEffect } from 'react';

export const getSelection = () => {
    if (!window.getSelection)
        return null;

    const selection = document.getSelection();
    if (!selection)
        return null;

    return selection.toString();
}

export const getSelectedWord = () => {
    const selection = document.getSelection();
    if (!selection)
        return null;

    if (selection.rangeCount === 0)
      return null;

    const selectionText = selection.toString();

    const words = selectionText.split(' ');
    if (words.length !== 1)
        return null;

    const word = words[0].trim();
    if (word.length === 0)
      return null;

    const range = selection.getRangeAt(0);
    return { word: word, rect: range.getBoundingClientRect() };
}

let selected: { word: string, rect: ClientRect };
const selectedListeners: any[] = [];

export const useSelectedWord = () => {
    const [ r, setR ] = useState<typeof selected | null>(null);

    useEffect(() => {
        selectedListeners.push(setR);

        return () => {
            const removeAt = selectedListeners.indexOf(setR);
            if (removeAt === -1) return;

            selectedListeners.splice(removeAt, 1);
        } 
    });

    return r;
}

document.addEventListener('selectionchange', () => {
    const selected = getSelectedWord();
    for (const listener of selectedListeners) {
        listener(selected);
    }
})