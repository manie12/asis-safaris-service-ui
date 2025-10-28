import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent, type SelectProps } from '@mui/material/Select';
import { useId, type ReactNode } from 'react';

import { colorTokens } from '@/design-system/theme/tokens';

export interface DSSelectOption {
  value: string;
  label: string;
}

export type DSSelectProps = SelectProps<string> & {
  label: string;
  options: DSSelectOption[];
  onValueChange?: (value: string, event: SelectChangeEvent<string>) => void;
};

export const DSSelect = ({
  label,
  options,
  onValueChange,
  onChange,
  sx,
  MenuProps,
  ...rest
}: DSSelectProps) => {
  const id = useId();

  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    onValueChange?.(event.target.value, event);
    onChange?.(event, child);
  };

  const baseSelectStyles = {
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.95)',
    '& .MuiSelect-select': {
      paddingY: 1.5,
      paddingX: 2,
    },
    '& fieldset': {
      borderColor: 'rgba(92, 63, 51, 0.18)',
    },
    '&:hover fieldset': {
      borderColor: colorTokens.safari[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: colorTokens.safari[600],
      borderWidth: 2,
    },
  };

  const combinedSx = Array.isArray(sx)
    ? [baseSelectStyles, ...sx]
    : sx
      ? [baseSelectStyles, sx]
      : baseSelectStyles;

  return (
    <FormControl fullWidth margin="normal" sx={{ '& .MuiFormLabel-root': { color: colorTokens.earth[500] } }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        onChange={handleChange}
        sx={combinedSx}
        MenuProps={{
          PaperProps: {
            elevation: 4,
            sx: {
              borderRadius: 3,
              mt: 1,
              backgroundColor: 'rgba(255,255,255,0.95)',
            },
          },
          ...MenuProps,
        }}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
