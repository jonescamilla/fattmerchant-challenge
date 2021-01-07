import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import React from 'react';

/**
 * Custom chakra-ui `Popover` that resets form state using formik's `resetForm` made for invoice form w/ predefined styling
 *
 * @see chakra-ui {@link https://chakra-ui.com/docs/overlay/popover `Popover` Docs}
 * @see Formik {@link https://formik.org/docs/api/formik#resetform-nextstate-partialformikstatevalues--void `resetForm` Docs}
 * @see Formik {@link https://formik.org/docs/api/useFormikContext `useFormikContext()` Docs}
 */

export const ClearForm = () => {
  // temporary solution. any should NOT be used
  const initialFocusRef: any = React.useRef();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { resetForm } = useFormikContext();
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button colorScheme="red">Clear Invoice</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Are you sure?
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody> You wont be able to undo this action</PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="red"
              ref={initialFocusRef}
              onClick={() => {
                onClose();
                resetForm();
              }}
            >
              Clear
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
