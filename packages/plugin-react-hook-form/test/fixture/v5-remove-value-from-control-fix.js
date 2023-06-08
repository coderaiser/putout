import {TextInput} from 'react-native';

<Controller
    render={({field}) => {
        const {
            value,
            onChange,
        } = fieldset;
        return (
            <TextInput name={name} onChange={onChange} style={{
                borderWidth: 2,
                borderColor: 'black',
            }}/>
        );
    }}
    name="text"
    control={(args) => args[0].nativeEvent.text}
    onChange={onChange}
/>;

<Hello
    abc={(args) => ({
        value: args[0].nativeEvent.text,
    })}
/>;

const fn = () => ({
    value: () => {},
});
