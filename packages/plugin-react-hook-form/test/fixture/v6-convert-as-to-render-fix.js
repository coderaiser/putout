const a = (
    <Controller render={({field}) => {
        const {
            value,
            onChange,
        } = field;
        return (
            <CustomInput onTextChange={onChange} onBlur={onBlur} textValue={value}/>
        );
    }} control={control} name="test"/>
);

const b = (
    <Controller
        render={({field}) => {
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
        render={({field}) => {
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
        render={({field}) => {
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
        render={({field}) => {
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
