export const getSelection = () => {
    if (!window.getSelection)
        return null;

    const selection = document.getSelection();
    if (!selection)
        return null;

    return selection.toString();
}

export const getSelectedWord = () => {
    const selection = getSelection();
    if (!selection)
        return null;

    const words = selection.split(' ');
    if (words.length !== 1)
        return null;

    return words[0];
}

document.addEventListener('selectionchange', () => {
    console.log("Selected word: ", getSelectedWord());
})