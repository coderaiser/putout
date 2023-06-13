const errorObjectParameters = new Set(['hello']);

[
    ...errorObjectParameters,
].map((key) => `'${key}'`);
