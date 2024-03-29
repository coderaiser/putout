export const getThemes = ({isDev = _isDev()} = {}) => {
    const themes = readFilesSyncMemo(isDev);
    
    return {
        ...themes,
    };
};
