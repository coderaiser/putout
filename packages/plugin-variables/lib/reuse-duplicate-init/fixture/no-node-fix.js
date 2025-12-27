const {error} = spawn.sync('npm', ['i', '--save-dev'].concat(packageList), {
    stdio: 'inherit',
});
