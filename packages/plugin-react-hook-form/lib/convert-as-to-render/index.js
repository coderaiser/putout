'use strict';

module.exports.report = () => `Use 'render' instead of 'as' in '<Control>' elements`;

module.exports.replace = () => ({
    [`
    <Controller 
      as={__a} 
      valueName="__b"
      onChangeName="__c"
      control={__d} 
      name="__e"  
    />
    `]: ({__a, __b, __c}) => {
        return `
            <Controller 
                render={({onChange, onBlur, value}) => (
                    <${__a.name} ${__c.value}={onChange} onBlur={onBlur} ${__b.value}={value} />
                )}
              control={__d} 
              name="__e"  
            />
        `;
    },
    
    [`
    <Controller 
      as={__a} 
      rules={__b}
      name={__e}
    />
    `]: () => {
        return `
            <Controller 
               name={__e}
                rules={__b}
                render={() => (
                    __a
                )}
            />
        `;
    },
    
    [`
    <Controller 
      as={__a} 
      rules={__b}
      name={__e}
      onChange={__f}
    />
    `]: () => {
        return `
            <Controller 
               name={__e}
                rules={__b}
                  onChange={__f}
                render={() => (
                    __a
                )}
            />
        `;
    },
    
    [`
    <Controller 
      as={__a} 
      rules={__b}
      name={__e}
      onChange={__f}
      onBlur ={__c}
    />
    `]: () => {
        return `
            <Controller 
               name={__e}
                rules={__b}
                  onChange={__f}
                  onBlur ={__c}
                render={() => (
                    __a
                )}
            />
        `;
    },
});
