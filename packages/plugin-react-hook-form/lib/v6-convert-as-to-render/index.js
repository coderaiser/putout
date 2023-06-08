'use strict';

const {
    types,
    template,
} = require('putout');

const {
    Identifier,
    JSXExpressionContainer,
    JSXIdentifier,
    isJSXSpreadAttribute,
    JSXAttribute,
} = types;

const ARROW = template(`({field}) => {
    const {value, onChange} = fieldset;
    return (%%expression%%);
}`);

module.exports.report = () => `Use 'render' instead of 'as' in '<Control/>' elements`;

module.exports.match = () => ({
    '<Controller __jsx_attributes/>': ({__jsx_attributes}) => {
        for (const attr of __jsx_attributes) {
            if (isJSXSpreadAttribute(attr)) {
                continue;
            }
            
            if (attr.name.name === 'as')
                return true;
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    [`
    <Controller
      as={__a}
      valueName="__b"
      onChangeName="__c"
      control={__d}
      name="__e"
    />
    `]: ({__a, __b, __c}) => `
        <Controller
            render={({field}) => {
                const {value, onChange} = field;
                return (
                    <${__a.name} ${__c.value}={onChange} onBlur={onBlur} ${__b.value}={value} />
                )
            }}
          control={__d}
          name="__e"
        />
    `,
    '<Controller __jsx_attributes/>': ({__jsx_attributes}, path) => {
        for (const attr of __jsx_attributes) {
            if (isJSXSpreadAttribute(attr))
                continue;
            
            if (attr.name.name === 'as') {
                attr.name.name = 'render';
                
                const {expression} = attr.value;
                
                const onChangeAttribute = JSXAttribute(JSXIdentifier('onChange'), JSXExpressionContainer(Identifier('onChange')));
                const nameAttribute = JSXAttribute(JSXIdentifier('name'), JSXExpressionContainer(Identifier('name')));
                
                expression.openingElement.attributes.unshift(...[nameAttribute, onChangeAttribute]);
                
                attr.value.expression = ARROW({
                    expression,
                });
                
                break;
            }
        }
        
        return path;
    },
});
