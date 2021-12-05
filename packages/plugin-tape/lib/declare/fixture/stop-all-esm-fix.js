import {createMockImport} from 'mock-import';
import fs from 'fs';

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
