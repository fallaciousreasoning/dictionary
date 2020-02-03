import React, { useState, useCallback, useEffect } from 'react';
import { findByRegex } from './dictionary';


export const Search = (props) => {
    const [query, setQuery] = useState('');

    const [results, setResults] = useState<any[]>([]);
    const onSearchChanged = useCallback(async e => {
        const query: string = e.target.value;
        setQuery(query);
        setResults(await findByRegex(query))
        window.history.replaceState({},
            `Dictionary results for ${query}`,
            `?query=${encodeURIComponent(query)}`)
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramsQuery = decodeURIComponent(searchParams.get('query') || '');

        setQuery(paramsQuery);
        findByRegex(paramsQuery).then(setResults);
        return () => {}
    }, []);

    return <div>
        <div>
            <input className="search-box"
                value={query}
                placeholder="search for words"
                onChange={onSearchChanged} />
        </div>
        <div>
            {results.length ? results.map((r, i) => <div key={i}>
                <h2>{r.word}</h2>
                <ul>
                    {r.map((entry, i) => <li key={i}>
                        {entry.definition}
                    </li>)}
                </ul>
            </div>) : "No results"}
        </div>
    </div>;
}