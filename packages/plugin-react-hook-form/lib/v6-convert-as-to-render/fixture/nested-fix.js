const b = (
    <Hello>
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
    </Hello>
);
