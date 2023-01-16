const {changeDir} = CloudCmd;

await changeDir(path);

await changeDir('/');

await changeDir(path, {
    panel
});
