import { Flex, useColorMode } from '@chakra-ui/react';

/**
 * function that returns `JSX.Element`s with pre-configured `JSX Attributes`
 * @param props any children you wish to render within Container or JSX attributes you wish to add
 */
export const Container = (props: any) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: 'gray.50', dark: 'gray.900' };

  const color = { light: 'black', dark: 'white' };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};
