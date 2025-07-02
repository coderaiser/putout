test('atob: browser', (t) => {
    const atobOriginal = global.atob;
    const str = 'hello';

    global.atob = stub();

    atob(str);

    t.calledWith(global.atob, [str], 'should call global.btoa');
    t.end();

    global.atob = atobOriginal;
});
