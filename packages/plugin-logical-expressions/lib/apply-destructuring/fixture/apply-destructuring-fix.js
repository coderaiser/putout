const arrow = (el) => {
    const {text} = el();
    return text && text.trim();
};

{
    const {workbench} = getState();
    const value = workbench && workbench.code;
}
