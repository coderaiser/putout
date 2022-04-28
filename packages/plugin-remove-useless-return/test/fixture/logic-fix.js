const fn = () => ({
    'const __a = __b(require(__c))': ({__a, __c}) => {
         return isIdentifier(__a) && isStringLiteral(__c);
     }
});

