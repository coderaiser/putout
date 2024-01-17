export function run({workerData, slave}) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(slave, {
            workerData,
        });
        
        worker.on('message', (event, data) => {
            console.log(data);
        });
        worker.on('error', reject);
        worker.on('exit', (code) => {
            reject(Error(`Worker stopped with exit code ${code}`));
        });
    });
}
