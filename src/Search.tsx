import React, { useState, useCallback } from 'react';
import { findByRegex } from './dictionary';


export const Search = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const onSearchChanged = useCallback(async e => {
        const query: string = e.target.value;
        setQuery(query);
        setResults(await findByRegex(query))
    }, []);

    return <div>
        <div>
            <label>Search</label>
            <input value={query} onChange={onSearchChanged} />
        </div>
        <div>
            <span>Results:</span>
            <div>
                {results.map(r => <div key={r.word}>
                    <h2>{r.word}</h2>
                    {r.definitions && <ul>
                        {r.definitions.map((d, i) => <li key={i} dangerouslySetInnerHTML={{ __html: d}}/>)}
                    </ul>}
                </div>)}
            </div>
        </div>
    </div>;
}