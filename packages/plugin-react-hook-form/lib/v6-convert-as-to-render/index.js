import {types, template} from 'putout';

const {
    jsxExpressionContainer,
    jsxIdentifier,
    isJSXSpreadAttribute,
    jsxAttribute,
    identifier,
} = types;

const ARROW = template(`({field}) => {
    const {value, onChange} = fieldset;
    return (%%expression%%);
}`);

export const report = () => `Use 'render' instead of 'as' in '<Control/>' elements`;

export const match = () => ({
    '<Controller __jsx_attributes/>': ({__jsx_attributes}) => {
        for (const attr of __jsx_attributes) {
            if (isJSXSpreadAttribute(attr))
                continue;
            
            if (attr.name.name === 'as')
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
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
                
                const onChangeAttribute = jsxAttribute(jsxIdentifier('onChange'), jsxExpressionContainer(identifier('onChange')));
                const nameAttribute = jsxAttribute(jsxIdentifier('name'), jsxExpressionContainer(identifier('name')));
                
                expression.openingElement.attributes.unshift(nameAttribute, onChangeAttribute);
                
                attr.value.expression = ARROW({
                    expression,
                });
                
                break;
            }
        }
        
        return path;
    },
});
