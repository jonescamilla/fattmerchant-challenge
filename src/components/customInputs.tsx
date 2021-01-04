import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Checkbox,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { FastField, FieldProps, useFormikContext } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import { invoice } from '../types';
import { calculateTotal } from '../utils/total';

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

/**
 * Custom formik `Field` displayed as chakra-ui `TextArea` w/ predefined styling.
 *
 * Offers `FormLabel` through JSX Attribute `label`
 * @see chakra-ui {@link https://chakra-ui.com/docs/form/textarea `Textarea` Docs}
 * @see Formik {@link https://formik.org/docs/api/field `Field` Docs}
 */
export const TextAreaField: React.FC<customInputsProps> = ({
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
}: customInputsProps): JSX.Element => (
  <Flex flexGrow={1} p="2" maxW="170px">
    {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
    <FastField name={name}>
      {({ form, field, meta }: FieldProps) => (
        <FormControl name={name} isInvalid={!!meta.error && meta.touched}>
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
}: customInputsProps): JSX.Element => (
  <Flex p="2" flexGrow={1} flexDir="row" id={`div.${name}`}>
    <FastField name={name}>
      {({ field }: FieldProps) => (
        <FormControl name={name}>
          <Flex flexGrow={1} flexDir="row">
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Checkbox size="lg" {...field} />
          </Flex>
        </FormControl>
      )}
    </FastField>
  </Flex>
);

/**
 * Custom `Stat` component from chakra-ui that displays the form `total` w/ predefined styling.
 *
 * Specifically for `InvoiceForm`
 *
 * @see chakra-ui {@link https://chakra-ui.com/docs/data-display/stat `Stat` Docs}
 */

export const InvoiceStat = () => {
  const {
    values: { total, items },
    setFieldValue,
  } = useFormikContext<invoice>();

  React.useEffect(() => {
    setFieldValue('total', calculateTotal(items));
  }, [total, items, setFieldValue]);

  return (
    <Stat width="125px" textAlign="right">
      <StatLabel>Invoice Total</StatLabel>
      <StatNumber fontSize="4xl">${total}</StatNumber>
      <StatHelpText>{`${items.length} total items`}</StatHelpText>
    </Stat>
  );
};
