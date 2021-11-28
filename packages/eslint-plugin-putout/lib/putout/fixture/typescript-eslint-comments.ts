/**
 * Copyright (c) 2016 The xterm.js authors. All rights reserved.
 * @license MIT
 */
import { ICircularList } from 'common/Types';

/**
 * Represents a circular list; a list with a maximum size that wraps around when push is called,
 * overriding values at the start of the list.
 */
export class CircularList<T> implements ICircularList<T> {
    get maxLength() {
        if (2)
            alert();
        
        return this._maxLength;
    }
}
