import b from 'b';

const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';

/**
 * This is class X
 */
export default class X {
    public a(): string {
        if (isNumber(b))
            return 'doStuff';
        
        return 'stuff';
    }
}
