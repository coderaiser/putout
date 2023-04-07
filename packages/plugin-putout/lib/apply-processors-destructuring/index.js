'use strict';

module.exports.report = () => 'Test operator should be destructured';

module.exports.replace = () => ({
    'async (t) => {await t.process(__args)}': 'async ({process}) => {await process(__args)}',
    'async (t) => {await t.noProcess(__args)}': 'async ({noProcess}) => {await noProcess(__args)}',
    'async (t) => {await t.comparePlaces(__args)}': 'async ({comparePlaces}) => {await comparePlaces(__args)}',
    'async (t) => {await t.process(__args); t.end();}': 'async ({process}) => {await process(__args)}',
    'async (t) => {await t.noProcess(__args); t.end();}': 'async ({noProcess}) => {await noProcess(__args)}',
    'async (t) => {await t.comparePlaces(__args); t.end();}': 'async ({comparePlaces}) => {await comparePlaces(__args)}',
});
