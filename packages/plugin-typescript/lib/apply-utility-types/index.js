'use strict';

module.exports.report = () => 'Utility types should be applied';

module.exports.replace = () => ({
    'type __a = {[__b in keyof __c]?: __c[__b];}': 'type __a = Partial<__c>',
    'type __a = {[__b in keyof __c]-?: __c[__b];}': 'type __a = Required<__c>',
    'type __a = {readonly [__b in keyof __c]: __c[__b];}': 'type __a = Readonly<__c>',
});
