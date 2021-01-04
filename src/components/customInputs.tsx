import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FastField, FieldProps } from 'formik';
import React, { InputHTMLAttributes } from 'react';

/**
 * props for CheckboxField, InputField, NumberField, and TextAreaField.
 * @property {string} [label] - passed in as string for `FormLabel`
 * @property {string} name - passed into as `name` JSX attribute
 * @property {string} [placeholder] - passed into `placeholder` JSX attribute
 * @property {number} [precision] - passed ont `precision` JSX attribute
 */
type customInputsProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder?: string;
  precision?: number;
};

/**
 * Custom formik `Field` displayed as chakra-ui `Input` w/ predefined styling.
 *
 * Offers `FormLabel` through JSX Attribute `label`
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/input `Input` Docs}
 * @see Formik {@link https://formik.org/docs/api/field `Field` Docs}
 */
export const InputField: React.FC<customInputsProps> = ({
  label,
  name,
  placeholder,
}): JSX.Element => {
  return (
    <Flex p="2" flexGrow={1} id={'div.' + name}>
      <FastField p="2" flexGrow={1} name={name}>
        {({ field, meta }: FieldProps) => (
          <FormControl name={name} isInvalid={!!meta.error && meta.touched}>
            <Flex flexDir="row">
              {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
              <Flex flexDir="column" flexGrow={1}>
                <Input
                  {...field}
                  id={name}
                  isInvalid={!!meta.error && meta.touched}
                  name={name}
                  placeholder={placeholder}
                  errortext={meta.error}
                ></Input>
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </Flex>
            </Flex>
          </FormControl>
        )}
      </FastField>
    </Flex>
  );
};
