t.match(written, /## my-rule/);

function noTEqual() {
    const count = (written.match(/## my-rule/) ?? []).length;
    fn();
}
