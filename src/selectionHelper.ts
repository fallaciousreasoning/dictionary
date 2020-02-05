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

let rect: { top: number, left: number, bottom: number, right: number, width: number, height: number };
const rectListeners: any[] = [];

export const useSelectionRect = () => {
    const [ r, setR ] = useState(rect);

    useEffect(() => {
        rectListeners.push(setR);

        return () => {
            const removeAt = rectListeners.indexOf(setR);
            if (removeAt === -1) return;

            rectListeners.splice(removeAt, 1);
        } 
    });

    return r;
}

document.addEventListener('selectionchange', () => {
    const selected = getSelectedWord();
    const rect = selected ? selected.rect : null;

    for (const listener of rectListeners) {
        listener(rect);
    }
})