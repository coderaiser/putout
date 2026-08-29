const count = (written.match(/## my-rule/) ?? []).length;

t.equal(count, 1);

function noTEqual() {
    const count = (written.match(/## my-rule/) ?? []).length;
    fn();
}
