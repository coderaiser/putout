 const {
    mockImport,
    reImport,
    stopAll
} = createMockImport(import.meta.url);

const mockRequire = require('mock-require');

{
  import {createMockImport} from 'mock-import';

  const {
      mockImport,
      stopAll,
      reImport
  } = createMockImport(import.meta.url);
}

