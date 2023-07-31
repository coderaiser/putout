const isSymbol = (a) => typeof a === 'symbol';

if (isSymbol(a))
    fn();
