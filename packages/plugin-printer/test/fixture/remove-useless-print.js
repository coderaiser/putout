export const ExpressionStatement = {
    print(path, {indent, print}) {
        indent();
        print('__expression');
        print.newline();
    },
}