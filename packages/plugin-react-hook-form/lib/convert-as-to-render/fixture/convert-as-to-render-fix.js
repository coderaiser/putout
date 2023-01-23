const a = <Controller
  render={(
    {
      onChange,
      onBlur,
      value
    }
  ) => (<CustomInput onTextChange={onChange} onBlur={onBlur} textValue={value} />)}
  control={control}
  name="test" />;
      

const b = <Controller 
  as={<CustomInput/>} 
  name={name}
/>;
      
const c = <Controller name={name} rules={rules} render={() => <CustomInput/>} />;
      
  
const d = <Controller name={name} rules={rules} onChange={onChange} render={() => <CustomInput/>} />;
      
const e = <Controller name={name} rules={rules} onChange={onChange} onBlur={onBlur} render={() => <CustomInput/>} />;
