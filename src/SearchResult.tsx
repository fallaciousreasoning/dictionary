import * as React from 'react';
import { Entry, Definition, entries } from './dictionary';

export const WordLink = ({ word }: { word: string }) => {
    return <a href={`?query=${word}`}>{word}</a>
}

const Def = ({ definition }: { definition: string }) => {
    if (!definition)
      return null;

    const linkPrefix = '___'
    let parts = definition.split(/(___\w+)/g).map((w, i) => <React.Fragment key={i}>
        {w.startsWith(linkPrefix)
            ? <WordLink word={w.substring(linkPrefix.length)}/>
            : w}
    </React.Fragment>);
    return <>
      {parts}
    </>
};

export const SearchResult = ({ entry }: { entry: Entry }) => {
    return <div className="search-result">
        <h2>{entry.word}</h2>
        <ul>
            {entry.map((d, i) => <li key={i}>
                <Def definition={d.definition}/>
                {/* <br />
                <Related definition={d} /> */}
            </li>)}
        </ul>
    </div>
}