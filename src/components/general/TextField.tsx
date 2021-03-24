import { FC } from 'react';
import { FormControl, FormHelperText, FormLabel, InputBase } from '@material-ui/core';

interface ITextFieldProps {
  name: string;
  title?: string;
  value?: string;
  placeholder?: string;
  onChangeTextField?: (text: string) => void;
}
const TextField: FC<ITextFieldProps> = (props) => {
  const { name, title, value, placeholder, onChangeTextField } = props;
  return (
    <FormControl fullWidth>
      {title && <FormLabel htmlFor={name}>{title}</FormLabel>}
      <InputBase
        name={name}
        id={name}
        aria-describedby={`${name}-helper-text`}
        fullWidth
        value={value}
        onChange={(e) => onChangeTextField(e.currentTarget.value)}
      />
      <FormHelperText id={`${name}-helper-text`}>{placeholder}</FormHelperText>
    </FormControl>
  );
};

export default TextField;
