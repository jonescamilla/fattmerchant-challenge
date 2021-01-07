import {
  useColorMode,
  Button,
  Tooltip,
  VisuallyHidden,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
/**
 * `Switch` component that handles logic for toggling colorMode used throughout application
 */
export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Tooltip hasArrow label="toggle color mode">
      <Button
        bg=""
        position="fixed"
        top="1rem"
        right="1rem"
        color="green"
        onClick={toggleColorMode}
      >
        <VisuallyHidden>Color Mode Toggle</VisuallyHidden>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Tooltip>
  );
};
