import React, { useState, useCallback, useEffect } from 'react';
import { findByRegex } from './dictionary';
import { SearchResult } from './SearchResult';


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
            {results.length
                ? results.map(entry => <SearchResult entry={entry} key={entry.word}/>)
                : "No results"}
        </div>
    </div>;
}