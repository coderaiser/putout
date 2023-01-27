const a = <Controller 
  as={CustomInput} 
  valueName="textValue"
  onChangeName="onTextChange"
  control={control} 
  name="test"  
/>;
      

const b = <Controller 
  as={<CustomInput/>} 
  name={name}
/>;
      
const c = <Controller 
  as={<CustomInput/>} 
  rules={rules}
  name={name}
/>;
      
  
const d = <Controller 
  as={<CustomInput/>} 
  rules={rules}
  name={name}
  onChange={onChange}
/>;
      
const e = <Controller 
  as={<CustomInput/>} 
  rules={rules}
  name={name}
  onChange={onChange}
  onBlur={onBlur}
/>;
