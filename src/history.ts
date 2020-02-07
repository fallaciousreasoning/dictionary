import { useState, useEffect } from "react";

var _wr = function(type) {
    var orig = window.history[type];
    return function() {
        var rv = orig.apply(window.history, arguments);
        var e = new Event(type);
        e['arguments'] = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
window.history.pushState = _wr('pushState');
window.history.replaceState = _wr('replaceState');

const locationListeners: any[] = [];
export const useQueryString = () => {
    const [query, setQuery] = useState(window.location.search);
    useEffect(() => {
        locationListeners.push(setQuery);

        return () => {
            const index = locationListeners.indexOf(setQuery);
            locationListeners.splice(index, 1);
        }
    });

    return query;
}

const onLocationChanged = () => {
    for (const listener of locationListeners) {
        listener(window.location.search);
    }
}

window.addEventListener('pushState', onLocationChanged);
window.addEventListener('replaceState', onLocationChanged);
window.addEventListener('hashchange', onLocationChanged);
window.addEventListener('popstate', onLocationChanged);