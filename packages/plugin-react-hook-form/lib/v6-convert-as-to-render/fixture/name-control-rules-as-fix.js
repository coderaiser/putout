export const a = () => <Controller
    name={name}
    control={control}
    rules={rules}
    render={({fieldset}) => {
        const {
            value,
            onChange,
        } = fieldset;
        return (
            <Input name={name} onChange={onChange}/>
        );
    }}
/>;
