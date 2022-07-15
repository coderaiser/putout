'use strict';

const {createTest} = require('@putout/test');
const removeThis = require('.');

const test = createTest(__dirname, {
    'remove-this': removeThis,
});

test('plugin-react-hooks: remove-this: report', (t) => {
    t.report('this', `should be used "submit" instead of "this.submit"`);
    t.end();
});

test('plugin-react-hooks: remove-this: transform', (t) => {
    t.transform('this');
    t.end();
});

test('plugin-react-hooks: remove-this: no transform: not-member', (t) => {
    t.noTransform('not-member');
    t.end();
});

test('plugin-react-hooks: remove-this: transform: code', (t) => {
    const from = `
        const {Component} = require('react');
        
        class Hello extends Component {
            render() {
                return (
                    <button onClick={this.setEnabled}/>
                );
            }
        }
    `;
    
    const to = `
        const {Component} = require('react');
        
        class Hello extends Component {
            render() {
                return (<button onClick={setEnabled}/>);
            }
        }
    `;
    
    t.transformCode(from, to);
    t.end();
});

