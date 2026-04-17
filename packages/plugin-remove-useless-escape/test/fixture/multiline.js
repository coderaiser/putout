export const replace = () => ({
    [element]: ({__a, __b, __c}) => `
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
});

