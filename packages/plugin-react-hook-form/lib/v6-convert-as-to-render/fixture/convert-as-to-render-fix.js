const a = (
    <Controller render={({onChange, onBlur, value}) => <CustomInput onTextChange={onChange} onBlur={onBlur} textValue={value}/>} control={control} name="test"/>
);

const b = (
    <Controller
        render={({fieldset}) => {
            const {
                value,
                onChange,
            } = fieldset;
            return (
                <CustomInput name={name} onChange={onChange}/>
            );
        }}
        name={name}
    />
);

const c = (
    <Controller
        render={({fieldset}) => {
            const {
                value,
                onChange,
            } = fieldset;
            return (
                <CustomInput name={name} onChange={onChange}/>
            );
        }}
        rules={rules}
        name={name}
    />
);

const d = (
    <Controller
        render={({fieldset}) => {
            const {
                value,
                onChange,
            } = fieldset;
            return (
                <CustomInput name={name} onChange={onChange}/>
            );
        }}
        rules={rules}
        name={name}
        onChange={onChange}
    />
);

const e = (
    <Controller
        render={({fieldset}) => {
            const {
                value,
                onChange,
            } = fieldset;
            return (
                <CustomInput name={name} onChange={onChange}/>
            );
        }}
        rules={rules}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
    />
);
