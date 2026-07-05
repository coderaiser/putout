import {test} from 'supertape';
import {montag} from 'montag';
import {
    wrapInNamespace,
    unwrapNamespace,
    __wasm_name,
} from './wasm.js';

test('putout: operator: wasm: wrapInNamespace: no prefix', ({equal}) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(b), local.get(a))
        }
    `;
    
    const result = wrapInNamespace(source);
    
    const expected = montag`
        namespace __putout_processor_wasm {
            export function x(a: i32, b: i32): i32 {
                i32.add(local.get(b), local.get(a))
            }
        }
    `;
    
    equal(result, expected);
});

test('putout: operator: wasm: wrapInNamespace: __wasm_name', ({equal}) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(b), local.get(a))
        }
    `;
    
    const result = wrapInNamespace(source, __wasm_name);
    
    const expected = montag`
        namespace __putout_processor_wasm {
            export function x(a: i32, b: i32): i32 {
                i32.add(local.get(b), local.get(a))
            }
        }
    `;
    
    equal(result, expected);
});

test('putout: operator: wasm: unwrapNamespace: no prefix', ({equal}) => {
    const source = montag`
        namespace __putout_processor_wasm {
            export function x(a: i32, b: i32): i32 {
                i32.add(local.get(b), local.get(a))
            }
        }
    `;
    
    const result = unwrapNamespace(source);
    
    const expected = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(b), local.get(a))
        }
    `;
    
    equal(result, expected);
});

test('putout: operator: wasm: unwrapNamespace: no namespace', ({equal}) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(b), local.get(a))
        }
    `;
    
    const result = unwrapNamespace(source);
    
    const expected = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(b), local.get(a))
        }
    `;
    
    equal(result, expected);
});

test('putout: operator: wasm: __wasm_name', ({equal}) => {
    equal(__wasm_name, '__putout_processor_wasm');
});
