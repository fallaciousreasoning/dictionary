import * as React from 'react';
import { Entry, Definition, entries } from './dictionary';

const WordLink = ({ word }: { word: string }) => {
    return <a href={`?query=${word}`}>{word}</a>
}

const Related = ({ definition }: { definition: Definition }) => {
    const related = [...(definition.antonyms || []), ...(definition.synonyms || [])];
    if (!related.length)
        return null;

    return <>
        <b>See Also: </b> {related.map((r, i) => <>
            {i !== 0 && ", "}
            <WordLink key={r} word={r} />
        </>)}
    </>
}

export const SearchResult = ({ entry }: { entry: Entry }) => {
    return <div className="search-result">
        <h2>{entry.word}</h2>
        <ul>
            {entry.map((d, i) => <li key={i}>
                {d.definition}
                {/* <br />
                <Related definition={d} /> */}
            </li>)}
        </ul>
    </div>
}