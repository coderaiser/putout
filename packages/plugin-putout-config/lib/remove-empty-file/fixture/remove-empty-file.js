__putout_processor_filesystem([
  '/',
  ['/.putout.json', '{}'],
  '/app/',
  ['/app/.putout.json', `{"rules": {"remove-debugger": "off"}}`],
  '/app1/',
  ['/app1/.putout.json', `{}\n`]
]);
