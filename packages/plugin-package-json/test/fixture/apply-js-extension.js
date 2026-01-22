__putout_processor_json({
  "type": "module",
  "main": "./lib/putout.mjs",
  "exports": {
    ".": {
      "require": "./lib/index.cjs",
      "import": "./lib/index.mjs"
    },
    "./parse-error": "./lib/parse-error.cjs",
    "./ignores": "./lib/ignores.mjs",
  },
  "bin": {
    "putout": "bin/tracer.mjs"
  },
});

__putout_processor_json({
  "main": "./lib/putout.mjs",
  "exports": {
    ".": {
      "require": "./lib/index.cjs",
      "import": "./lib/index.mjs"
    },
    "./parse-error": "./lib/parse-error.cjs",
    "./ignores": "./lib/ignores.mjs",
  },
  "bin": {
    "putout": "bin/tracer.mjs"
  },
});