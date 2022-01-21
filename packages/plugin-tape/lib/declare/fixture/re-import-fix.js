import {readFile} from 'fs/promises';

import {createMockImport} from 'mock-import';

const {
  stopAll
} = createMockImport(import.meta.url);

const {
  mockImport
} = createMockImport(import.meta.url);

const {
  reImport
} = createMockImport(import.meta.url);

await reImport('hello');
await reImport('world');

mockImport('a', b);
stopAll();
