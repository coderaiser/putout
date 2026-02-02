const expected = [{
   message: `Add dotfiles to '.npmignore'`,
   position: {
       column: 0,
       line: 1,
   },
   rule: 'npmignore',
}];

t.deepEqual(places, expected);
t.end();

const a = {
    b: 0
}