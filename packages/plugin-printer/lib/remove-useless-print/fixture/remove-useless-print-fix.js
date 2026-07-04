export const ExpressionStatement = (path, {indent, print}) => {
    indent();
    print('__expression');
    print.newline();
};
