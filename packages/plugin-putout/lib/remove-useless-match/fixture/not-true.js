export const match = () => ({
    'progress(__args)': checkAwait,
    't.progress(__args)': checkAwait,
});
