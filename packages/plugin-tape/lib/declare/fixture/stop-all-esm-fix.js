import fs from 'fs';

import {createMockImport} from 'mock-import';

const {
  reImport
} = createMockImport(import.meta.url);

const {
  mockImport
} = createMockImport(import.meta.url);

const {
  stopAll
} = createMockImport(import.meta.url);

await reImport('hello');
await reImport('world');

mockImport('a', b);
stopAll();
