export const TryStatement = (path, {print}) => {
    print(path.get('block'));
    print(path.get('handler'));
};
