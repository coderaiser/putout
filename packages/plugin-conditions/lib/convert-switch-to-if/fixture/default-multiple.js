switch (plugin) {
case 'a':
    return a;

default:
    if (plugin[0] === 'recordAndTuple')
        return 'recordAndTuple';

    return plugin;
}
