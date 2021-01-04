// chakra-ui components
import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
// formik components and helpers
import { ArrayHelpers, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
// types
import { invoice, item } from '../types';
// schema used in formik
import { invoiceValidationSchema } from '../utils/validationSchema';
// custom inputs created with both formik and chakra-ui
import {
  CheckboxField,
  InputField,
  NumberField,
  InvoiceStat,
  TextAreaField,
} from './customInputs';
// import axios from 'axios';

/**
 * Form of an invoice utilizing: `Formik` for form management and `Yup` for validation of form.
 */
export const InvoiceForm = () => {
  const itemState: item = {
    details: '',
    quantity: 0,
    price: '0.00',
    discounted: false,
  };

  /**
   * Initial values for an invoice used/passed into in `Formik`
   *
   * @see Formik {@link https://formik.org/docs/api/formik#initialvalues-values `InitialValues` Docs}
   */
  const initialValues: invoice = {
    memo: '',
    items: [itemState],
    total: '0.00',
  };
  let customBool: boolean = false;

  return (
    <Box mt={8} mx="auto" maxW="900px" w="100%">
      <Heading pt="4" pb="4">
        Invoice
      </Heading>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }: FormikHelpers<invoice>) => {
          setSubmitting(true);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 3000);
          customBool = !customBool;
          setSubmitting(false);
        }}
        validationSchema={invoiceValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <TextAreaField name="memo" label="Memo" placeholder="your memo.." />
            <FieldArray name="items">
              {({ remove, push }: ArrayHelpers) => (
                <>
                  {values.items.length > 0 &&
                    values.items.map((_item, index) => (
                      <Flex
                        mt="2"
                        alignItems="flex-start"
                        key={index}
                        id={`items.${index}`}
                        justifyContent="space-between"
                        htmlFor={`items.${index}`}
                      >
                        <InputField
                          name={`items.${index}.details`}
                          placeholder="descriptors..."
                          label="Description"
                        />

                        <NumberField
                          label="Quantity"
                          name={`items.${index}.quantity`}
                        />

                        <NumberField
                          label="Price"
                          name={`items.${index}.price`}
                          precision={2}
                        />

                        <CheckboxField
                          label="Disc."
                          name={`items.${index}.discounted`}
                        />

                        <Button
                          m="2"
                          type="button"
                          // name={`items.${index}-remove-button`}
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </Button>
                      </Flex>
                    ))}
                  <Button
                    mt="2"
                    mb="2"
                    type="button"
                    onClick={() => push(itemState)}
                  >
                    Add Item
                  </Button>
                </>
              )}
            </FieldArray>
            <Divider mt="2" />
            <Flex mt="2" justifyContent="flex-end">
              <Flex width="125px" flexDir="column">
                <InvoiceStat />
                <Button isLoading={isSubmitting} type="submit">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
