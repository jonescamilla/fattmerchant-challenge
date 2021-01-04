import { Container } from '../components/Container';
import { InvoiceForm } from '../components/InvoiceForm';
// UI toggle
import { DarkModeSwitch } from '../components/ColorModeSwitch';

/** starting point of application */
const Index = () => {
  return (
    <Container>
      <DarkModeSwitch />
      <InvoiceForm />
    </Container>
  );
};

export default Index;
