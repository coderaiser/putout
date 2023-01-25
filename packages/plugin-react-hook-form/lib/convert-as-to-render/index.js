'use strict';

const {types} = require('putout');
const {ArrowFunctionExpression} = types;

module.exports.report = () => `Use 'render' instead of 'as' in '<Control/>' elements`;

module.exports.match = () => ({
    '<Controller __jsx_attributes/>': ({__jsx_attributes}) => {
        for (const attr of __jsx_attributes)
            if (attr.name.name === 'as')
                return true;
        
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
            render={({onChange, onBlur, value}) => (
                <${__a.name} ${__c.value}={onChange} onBlur={onBlur} ${__b.value}={value} />
            )}
          control={__d}
          name="__e"
        />
    `,
    '<Controller __jsx_attributes/>': ({__jsx_attributes}, path) => {
        for (const attr of __jsx_attributes) {
            if (attr.name.name === 'as') {
                attr.name.name = 'render';
                const {expression} = attr.value;
                
                attr.value.expression = ArrowFunctionExpression([], expression);
                break;
            }
        }
        
        return path;
    },
});

