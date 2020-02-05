import { useState, useEffect } from "react";

let sneakH = window.history;
var _wr = function(type) {
    var orig = sneakH[type];
    return function() {
        var rv = orig.apply(sneakH, arguments);
        var e = new Event(type);
        e['arguments'] = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
sneakH.pushState = _wr('pushState');
sneakH.replaceState = _wr('replaceState');

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