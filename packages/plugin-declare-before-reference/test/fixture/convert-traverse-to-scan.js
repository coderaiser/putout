const FS = '__putout_processor_filesystem(__object)';

export const report = () => `Remove vim swap file`;

export const fix = (filePath) => {
    removeFile(filePath);
};

export const traverse = ({push}) => ({
    [FS](path) {
        findFile(path, '*.swp').map(push);
    }
});

