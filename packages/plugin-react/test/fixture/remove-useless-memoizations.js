const treeAdapter = useMemo(() => treeAdapterFromParseResult(parseResult, settings), [parseResult.treeAdapter, settings]);

const onMouseDown = useCallback(() => {
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
}, [vertical, onResize]);

const Child = React.memo(function Child({ onClick }) {
  console.log("Child render");

  return <button onClick={onClick}>Click</button>;
});

const Parent = memo(function Child({ onClick }) {
  console.log("Child render");

  return <button onClick={onClick}>Click</button>;
});