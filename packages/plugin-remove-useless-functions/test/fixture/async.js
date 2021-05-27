async function run() {
    return async (processedSource, branchedList) => {
        return await merge(processedSource, branchedList);
    };
}
