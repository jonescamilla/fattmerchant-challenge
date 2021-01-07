import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { FastField, FieldProps } from 'formik';
import React from 'react';
import { customFieldProps } from '../../types';

/**
 * Custom formik `Field` displayed as chakra-ui `TextArea` w/ predefined styling.
 *
 * Offers `FormLabel` through JSX Attribute `label`
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/textarea `Textarea` Docs}
 * @see Formik {@link https://formik.org/docs/api/field `Field` Docs}
 */
export const TextAreaField: React.FC<customFieldProps> = ({
  label,
  name,
  placeholder,
}): JSX.Element => {
  return (
    <Flex>
      <FastField name={name}>
        {({ field, meta }: FieldProps) => (
          <FormControl
            name={name}
            isInvalid={!!meta.error && meta.touched}
            mt={4}
          >
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <Textarea placeholder={placeholder} {...field} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </FastField>
    </Flex>
  );
};
