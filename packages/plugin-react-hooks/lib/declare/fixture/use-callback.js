const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
