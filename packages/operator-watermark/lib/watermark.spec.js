import test from 'supertape';
import montag from 'montag';
import putout from 'putout';

const noop = () => {};

test('putout: operator-watermark: when function used', (t) => {
    const source = montag`
        template('hello');
        NumericLiteral(5);
    `;
    
    const {code} = putout(source, {
        rules: {
            'nodejs': 'off',
            'putout': 'off',
            'putout/declare': 'on',
            'putout/apply-lowercase-to-node-builders': 'on',
            'nodejs/convert-esm-to-commonjs': 'on',
            'nodejs/add-missing-strict-mode': 'on',
        },
        plugins: [
            'nodejs',
            'putout',
        ],
    });
    
    const expected = montag`
       'use strict';
       
       const {types: types} = require('putout');
       const {template: template} = require('putout');
       const {numericLiteral} = types;
       
       template('hello');
       numericLiteral(5);
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator-watermark: after remove', (t) => {
    const remove = {
        report: noop,
        match: () => ({
            'import __imports from "react"': ({__imports}) => __imports[0].local.name === 'React',
        }),
        replace: () => ({
            'import React from "react"': '',
            'import __imports from "react"': () => '',
        }),
    };
    
    const source = montag`
        import React from 'react';
        import {use} from 'react';
        import {abc} from 'react'
    `;
    
    const {code} = putout(source, {
        rules: {
            'esm': 'off',
            'esm/merge-duplicate-imports': 'on',
        },
        plugins: [
            'esm',
            ['remove', remove],
        ],
    });
    
    const expected = montag`
        import {use, abc} from 'react';\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator-watermark: has', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'return x': (vars, path) => {
                path
                    .getPrevSibling()
                    .remove();
                
                return 'return x';
            },
        }),
    };
    
    const {code} = putout('var y; return x', {
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = 'return x;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: operator-watermark: no loc', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'for (const [__a] of entries(__b)) __body': 'for (const __a of keys(__b)) __body',
        }),
    };
    
    const source = montag`
        for (const [name] of entries(tokens)) {
            for (const [x] of entries(y)) {
                console.log(name);
            }
        }
    `;
    
    const {code} = putout(source, {
        fixCount: 1,
        plugins: [
            ['var-to-const', varToConst],
        ],
    });
    
    const expected = montag`
        for (const name of keys(tokens)) {
            for (const x of keys(y)) {
                console.log(name);
            }
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});
