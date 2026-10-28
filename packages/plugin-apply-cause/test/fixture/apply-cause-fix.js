try {} catch(error) {
    if (controller.signal.aborted)
        throw Error('timeout', {
            cause: param,
        });
    
    throw error;
}

try {} catch {
    if (controller.signal.aborted)
        throw Error('timeout');
    
    throw error;
}
throw Error('timeout');
