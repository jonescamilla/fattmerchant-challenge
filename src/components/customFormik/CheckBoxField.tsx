import { Flex, FormControl, FormLabel, Checkbox, Box } from '@chakra-ui/react';
import { FastField, FieldProps } from 'formik';
import React from 'react';
import { customFieldProps } from '../../types';

/**
 * Custom formik `Field` displaying as chakra-ui `CheckBox` w/ predefined styling.
 *
 * Offers `FormLabel` through JSX Attribute `label`
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/checkbox `CheckBox` Docs}
 * @see Formik {@link https://formik.org/docs/api/field `Field` Docs}
 */
export const CheckboxField = ({
  name,
  label,
}: customFieldProps): JSX.Element => (
  <Flex p="2" flexDir="column" id={`div.${name}`}>
    <FastField name={name}>
      {({ field }: FieldProps) => (
        <FormControl name={name}>
          <Flex alignItems="center" height="2.5rem" pr="4">
            <Box bg="red"></Box>
            {label ? (
              <FormLabel position="absolute" top="-30px" htmlFor={name}>
                {label}
              </FormLabel>
            ) : null}
            <Checkbox defaultChecked={field.value} size="lg" {...field} />
          </Flex>
        </FormControl>
      )}
    </FastField>
  </Flex>
);
