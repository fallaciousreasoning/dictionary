import React, { useState, useCallback, useEffect } from 'react';
import { findByRegex, Entry, didYouMean } from './dictionary';
import { SearchResult, WordLink } from './SearchResult';

export const Search = (props) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const [results, setResults] = useState<Entry[]>([]);
    const [suggestions, setSuggestions] = useState<Entry[]>([]);

    const onSearchChanged = useCallback(async e => {
        const query: string = e.target.value;
        setQuery(query);
        setLoading(true);
        setResults(await findByRegex(query));
        setLoading(false);
        window.history.replaceState({},
            `Dictionary results for ${query}`,
            `?query=${encodeURIComponent(query)}`)
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramsQuery = decodeURIComponent(searchParams.get('query') || '');

        setQuery(paramsQuery);
        findByRegex(paramsQuery).then(setResults).then(() => setLoading(false));
        return () => { }
    }, []);

    useEffect(() => {
        setSuggestions([]);
        
        if (results.length !== 0)
          return;

        didYouMean(query).then(setSuggestions);
    }, [results]);

    const showSuggestions = suggestions.length !== 0 && results.length === 0;

    return <div>
        <div className="search-header">
            <input className="search-box"
                type="search"
                value={query}
                placeholder="search for words"
                onChange={onSearchChanged} />
        </div>
        <div>
            {(!loading && results.length === 0
                ? <h2>No results</h2>
                : results.map(entry => <SearchResult entry={entry} key={entry.word} />))}
            {showSuggestions && <div>
                <h2>Did you mean:</h2>
                <ul>
                    {suggestions.map(s => <li key={s.word}><WordLink word={s.word}/></li>)}
                </ul>
            </div>}
            {loading && <div className="spinner" />}
        </div>
    </div>;
}