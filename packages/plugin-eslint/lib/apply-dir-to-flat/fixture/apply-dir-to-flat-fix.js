const scriptsConfig = await matchToFlatDir(__dirname, 'scripts');

const monoConfig = await mergeESLintConfigs(__dirname, ['codemods', 'packages', 'rules']);
