t.transform('nested-not-block', [
    ['convert-if-to-jmp', convertIfToJmp],
    convertDoWhileToJnz
]);


t.noReport('nested-not-block', [
    ['convert-if-to-jmp', convertIfToJmp],
    'convertDoWhileToJnz',
]);

t.noReport('nested-not-block', [
    ['convert-if-to-jmp', convertIfToJmp],
]);

t.noReport('nested-not-block', [
    convertDoWhileToJnz
]);