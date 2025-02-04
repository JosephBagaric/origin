import React, { PropsWithChildren, ReactElement } from 'react';
import { TextField, Autocomplete, Chip, TextFieldProps } from '@mui/material';
import { useSelectAutocompleteEffects } from './SelectAutocomplete.effects';
import { useStyles } from './SelectAutocomplete.styles';
import { FormSelectOption } from '../FormSelect';

export type SelectAutocompleteField<FormValuesType> = {
  name: keyof FormValuesType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: FormSelectOption[];
  multiple?: boolean;
  maxValues?: number;
  textFieldProps?: TextFieldProps;
  dependentOn?: string;
  dependentOptionsCallback?: (fieldValue: any) => FormSelectOption[];
};

export interface SelectAutocompleteProps<FormValuesType = any> {
  value: FormSelectOption[];
  onChange: (newValue: FormSelectOption[]) => void;
  field: SelectAutocompleteField<FormValuesType>;
  errorExists?: boolean;
  errorText?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  dependentValue?: any;
  className?: string;
}

export type TSelectAutocomplete = <FormValuesType>(
  props: PropsWithChildren<SelectAutocompleteProps<FormValuesType>>
) => ReactElement;

export const SelectAutocomplete: TSelectAutocomplete = ({
  value,
  field,
  onChange,
  errorExists = false,
  errorText = '',
  disabled = false,
  variant = 'filled',
  dependentValue = null,
  className,
}) => {
  const { options, textValue, setTextValue, changeHandler } =
    useSelectAutocompleteEffects(onChange, dependentValue, field);
  const classes = useStyles();

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      options={options}
      className={`${classes.autocomplete} ${className}`}
      inputValue={textValue}
      getOptionLabel={(option: FormSelectOption) => option.label}
      onChange={changeHandler}
      isOptionEqualToValue={(
        option: FormSelectOption,
        value: FormSelectOption
      ) => option.value === value.value}
      getOptionDisabled={() => disabled}
      disabled={disabled}
      value={value !== undefined ? value : []}
      renderInput={(params) => (
        <TextField
          {...params}
          required={field.required && !(value?.length > 0)}
          label={field.label}
          placeholder={field.placeholder}
          onChange={(event: any) => setTextValue(event.target.value)}
          helperText={errorText}
          inputProps={{ ...params.inputProps }}
          error={errorExists}
          variant={variant}
          fullWidth
          {...field.textFieldProps}
        />
      )}
      renderTags={(value, getTagProps) => {
        return value.map((option, index) => (
          <Chip
            color="primary"
            label={(option as FormSelectOption).label}
            key={(option as FormSelectOption).value}
            disabled={disabled}
            {...getTagProps({ index })}
          />
        ));
      }}
    />
  );
};
