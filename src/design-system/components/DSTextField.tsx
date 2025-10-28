import TextField, { type TextFieldProps } from '@mui/material/TextField';

export type DSTextFieldProps = TextFieldProps;

export const DSTextField = ({ variant = 'outlined', InputProps, ...props }: DSTextFieldProps) => (
  <TextField
    fullWidth
    margin="normal"
    variant={variant}
    InputProps={{
      ...InputProps,
      sx: {
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.9)',
        '& fieldset': {
          borderColor: 'rgba(92, 63, 51, 0.2)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(238, 92, 40, 0.7)',
        },
        '&.Mui-focused fieldset': {
          borderWidth: 2,
          borderColor: 'rgba(238, 92, 40, 0.9)',
        },
        ...(InputProps?.sx ?? {}),
      },
    }}
    {...props}
  />
);
