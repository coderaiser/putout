{
  import {createMockImport} from 'mock-import';

  const {
    mockImport,
    stopAll,
    reImport
  } = createMockImport(import.meta.url);
}

mockImport('hello', hello);
