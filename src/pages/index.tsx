import { Text } from '@chakra-ui/react';
import { Container } from '../components/Container';
// UI toggle
import { DarkModeSwitch } from '../components/DarkModeSwitch';

/** starting point of application */
const Index = () => {
  return (
    <Container height="100vh">
      <Text>hello there</Text>
      <DarkModeSwitch />
    </Container>
  );
};

export default Index;
