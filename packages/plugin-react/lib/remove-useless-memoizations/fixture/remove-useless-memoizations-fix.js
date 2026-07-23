const treeAdapter = () => treeAdapterFromParseResult(parseResult, settings);

const onMouseDown = () => {
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
};

const Child = function Child({onClick}) {
    console.log('Child render');
    
    return (
        <button onClick={onClick}>Click</button>
    );
};

const Parent = function Child({onClick}) {
    console.log('Child render');
    
    return (
        <button onClick={onClick}>Click</button>
    );
};
