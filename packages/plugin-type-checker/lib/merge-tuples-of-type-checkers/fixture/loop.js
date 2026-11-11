const isLoopOrSwitch = createTypeChecker([
    ['+', isLoop],
    '+: -> SwitchStatement',
]);
