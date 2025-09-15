export const fix = ({path}) => {
    removeClassName(path, 'menu-item-selected');
};

export const traverse = ({push}) => ({
    JSXElement(path) {
        push({path});
    },
});


