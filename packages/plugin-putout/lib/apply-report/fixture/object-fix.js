import * as applyEquality from '../apply-equality/index.js';

test.only('compiler: move-vars-to-bottom: apply-equality', (t) => {
    t.noReport('apply-equality', [
        ['apply-equality', applyEquality]
    ]);
});

test.only('compiler: move-vars-to-bottom: apply-equality', (t) => {
    t.noReportWithOptions('apply-equality', {
        plugins: [],
    });
});

test.only('compiler: move-vars-to-bottom: apply-equality', (t) => {
    t.noReportWithOptions('submenu', {
        submenuIndex: 1,
        insideSubmenu: false,
    });
});
