import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { FastField, FieldProps } from 'formik';
import React from 'react';
import { customFieldProps } from '../../types';

/**
 * Custom formik `Field` displayed as chakra-ui `Input` w/ predefined styling.
 *
 * Offers `FormLabel` through JSX Attribute `label`
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/input `Input` Docs}
 * @see Formik {@link https://formik.org/docs/api/field `Field` Docs}
 */
export const InputField: React.FC<customFieldProps> = ({
  label,
  name,
  placeholder,
}): JSX.Element => {
  return (
    <Flex p="2" flexGrow={1} id={'div.' + name}>
      <FastField p="2" flexGrow={1} name={name}>
        {({ field, meta }: FieldProps) => (
          <FormControl name={name} isInvalid={!!meta.error && meta.touched}>
            <Flex flexDir="column">
              {label ? (
                <FormLabel position="absolute" top="-30px" htmlFor={name}>
                  {label}
                </FormLabel>
              ) : null}
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
