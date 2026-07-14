import {test} from 'supertape';

{
    const {disabled} = screen.getByRole('button');
    t.notOk(disabled);
}
{
    const result = readState({
        getItem,
    });
    const expected = {
        a: 1,
    };
    
    t.deepEqual(result, expected);
}
test('one argument', (t) => {
    {
        const result = readState({
            getItem,
        });
        t.notOk(result);
    }
    t.end();
});
