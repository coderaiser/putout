const a = await permissions.request({
    name: 'local-fonts'
});

const status = await (navigator as unknown as IFontAccessNavigator).permissions.request?.({
    name: 'local-fonts'
});
