import React, { useCallback } from "react"
import { useSelectedWord } from "./selectionHelper";
import { Popper } from 'react-popper';

class VirtualReference {
    rect: ClientRect;

    getBoundingClientRect() {
        return this.rect;
    }

    constructor(rect: ClientRect) {
        this.rect = rect;
    }

    get clientWidth() {
        return this.getBoundingClientRect().width;
    }

    get clientHeight() {
        return this.getBoundingClientRect().height;
    }
}

export const WordTip = ({ word }: { word: string }) => {
    const selected = useSelectedWord();
    const searchCallback = useCallback(() =>
        window.history.pushState(null, "Dictionary", `?query=${encodeURIComponent(selected ? selected.word : '')}`),
        [selected]);

    if (!selected)
      return null;

    const virtualRef = new VirtualReference(selected.rect);
    return <Popper referenceElement={virtualRef} placement="bottom">
        {({ ref, style, placement }) => <div ref={ref} style={style} data-placement={placement} className="word-tip">
            <button onClick={searchCallback}>
                Search
            </button>
        </div>}
    </Popper>
}