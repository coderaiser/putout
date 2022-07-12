import {useCallback} from 'react';
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
