test('plugin-putout: convert-url-to-dirname: transform: esm', (t) => {
    t.noReport('esm');
    t.end();
});

test('plugin-putout: convert-url-to-dirname: no transform: dirname', (t) => {
  t.noReport('dirname');
  t.end();
});

