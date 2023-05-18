'use strict';

module.exports.report = () => `Add missing operator 'new'`;

module.exports.replace = () => ({
    'Set(__args)': 'new Set(__args)',
    'WeakSet(__args)': 'new WeakSet(__args)',
    'Map(__args)': 'new Map(__args)',
    'WeakMap(__args)': 'new WeakMap(__args)',
    'Type(__args)': 'new Type(__args)',
    'Int8Array(__args)': 'new Int8Array(__args)',
    'Uint8Array(__args)': 'new Uint8Array(__args)',
    'Uint8ClampedArray(__args)': 'new Uint8ClampedArray(__args)',
    'Int16Array(__args)': 'new Int16Array(__args)',
    'Uint16Array(__args)': 'new Uint16Array(__args)',
    'Int32Array(__args)': 'new Int32Array(__args)',
    'Uint32Array(__args)': 'new Uint32Array(__args)',
    'Float32Array(__args)': 'new Float32Array(__args)',
    'Float64Array(__args)': 'new Float64Array(__args)',
    'BigInt64Array(__args)': 'new BigInt64Array(__args)',
    'BigUint64Array(__args)': 'new BigUint64Array(__args)',
});
