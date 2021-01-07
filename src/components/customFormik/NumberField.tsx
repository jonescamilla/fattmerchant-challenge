import {
  Flex,
  FormLabel,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FastField, FieldProps } from 'formik';
import React from 'react';
import { customFieldProps } from '../../types';

/**
 * Custom formik `Field` displayed as chakra-ui `NumberInput` w/ predefined styling.
 *
 * Offers `FormLabel` through JSX Attribute `label`
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/number-input `NumberInput` Docs}
 * @see Formik {@link https://formik.org/docs/api/field `Field` Docs}
 */
export const NumberField = ({
  label,
  name,
  precision,
}: customFieldProps): JSX.Element => (
  <Flex flexGrow={1} p="2" flexDir="column" maxW="125px">
    <FastField name={name}>
      {({ form, field, meta }: FieldProps) => (
        <FormControl name={name} isInvalid={!!meta.error && meta.touched}>
          {label ? (
            <FormLabel position="absolute" top="-30px" htmlFor={name}>
              {label}
            </FormLabel>
          ) : null}
          <NumberInput
            id={name}
            min={0}
            {...field}
            onChange={async (value) => form.setFieldValue(field.name, value)}
            allowMouseWheel
            precision={precision}
            name={name}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </FastField>
  </Flex>
);
