export const createTrace = (parentPort) => (event, data) => {
    parentPort?.postMessage([event, data]);
};
