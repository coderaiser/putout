import {createMockImport} from 'mock-import';

const {
  mockImport
} = createMockImport(import.meta.url);

mockImport('hello', hello);
mockImport('world', world);
