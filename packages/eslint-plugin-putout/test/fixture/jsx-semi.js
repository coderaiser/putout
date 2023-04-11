const b = (
    <Controller
        as={<TextInput style={{borderWidth: 2, borderColor: 'black'}} />}
        name="text"
        control={(args) => args[0].nativeEvent.text}
        onChange={onChange}
    />
);
