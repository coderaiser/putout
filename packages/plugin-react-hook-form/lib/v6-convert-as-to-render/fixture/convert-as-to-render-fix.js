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
  render={() => <CustomInput/>} 
  name={name}
/>;
      
const c = <Controller 
  render={() => <CustomInput/>} 
  rules={rules}
  name={name}
/>;
      
  
const d = <Controller 
  render={() => <CustomInput/>} 
  rules={rules}
  name={name}
  onChange={onChange}
/>;
      
const e = <Controller 
  render={() => <CustomInput/>} 
  rules={rules}
  name={name}
  onChange={onChange}
  onBlur={onBlur}
/>;
