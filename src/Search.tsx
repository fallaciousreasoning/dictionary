import React, { useState, useCallback, useEffect } from 'react';
import { findByRegex, Entry, didYouMean } from './dictionary';
import { SearchResult, WordLink } from './SearchResult';
import { useDebounce } from './throttle';
import { useQueryString } from './history';

export const Search = (props) => {
    const [query, setQuery] = useState('');
    const locationQueryString = useQueryString();

    const debouncedQuery = useDebounce(query, 500);
    const [loading, setLoading] = useState(true);

    const [results, setResults] = useState<Entry[]>([]);
    const [suggestions, setSuggestions] = useState<Entry[]>([]);

    const updateResults = async (q?) => {
        if (!q) q = query;

        setLoading(true);
        setSuggestions([]);
        setResults(await findByRegex(q));
        setLoading(false);
        window.history.replaceState({},
            `Dictionary results for ${q}`,
            `?query=${encodeURIComponent(q)}`);
    }

    const onSearchChanged = useCallback(async e => {
        const query: string = e.target.value;
        setQuery(query);

        await updateResults(query);
    }, []);

    // When location.search changes, update the search results.
    useEffect(() => {
        const searchParams = new URLSearchParams(locationQueryString);
        const paramsQuery = decodeURIComponent(searchParams.get('query') || '');

        if (paramsQuery === query)
            return;
            
        setQuery(paramsQuery);
        updateResults(paramsQuery);
    }, [locationQueryString]);

    // Get suggestions if the user has stopped typing and there are no results.
    useEffect(() => {
        if (results.length !== 0 || query !== debouncedQuery || !query.length)
            return;

        didYouMean(debouncedQuery).then(setSuggestions);
    }, [debouncedQuery, query, results]);

    // On initial load, display some words.
    useEffect(() => {
      updateResults();
    }, []);

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
                    {suggestions.map(s => <li key={s.word}><WordLink word={s.word} /></li>)}
                </ul>
            </div>}
            {loading && <div className="spinner" />}
        </div>
    </div>;
}