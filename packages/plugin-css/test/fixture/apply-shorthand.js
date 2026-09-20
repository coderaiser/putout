[
    rule(selector([
        classSelector('foo'),
    ]), [
        declaration('margin', dimension(1, 'px')),
    ]),
    rule(selector([
        classSelector('bar'),
    ]), [
        declaration('margin', valueList([
            dimension(1, 'px'),
            dimension(1, 'px'),
            dimension(1, 'px'),
            dimension(1, 'px'),
        ])),
    ]),
];
