export const report = () => 'Use Boolean constructor';

export const replace = () => ({
    '__a.filter(__b => __b)': '__a.filter(Boolean)',
    '__a.find(__b => __b)': '__a.find(Boolean)',
});
