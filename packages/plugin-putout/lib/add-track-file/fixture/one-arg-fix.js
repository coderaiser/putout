export const scan = (root, {trackFile}) => {
    for (const file of trackFile(root, 'package.json')) {}
};
