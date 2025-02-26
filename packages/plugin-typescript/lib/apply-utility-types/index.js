'use strict';

module.exports.report = () => 'Apply utility types';

module.exports.replace = () => ({
    'type __a = {readonly [__b in keyof __c]: __c[__b];}': 'type __a = Readonly<__c>',
    'type __a = {[__b in keyof __c]?: __c[__b];}': 'type __a = Partial<__c>',
    'type __a = {[__b in keyof __c]-?: __c[__b];}': 'type __a = Required<__c>',
    'type __a = Pick<__b, Exclude<keyof __b, __c>>': 'type __a = Omit<__b, __c>',
});
