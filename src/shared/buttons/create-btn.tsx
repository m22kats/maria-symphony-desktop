import { Button } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  text-align: right;
  margin-bottom: 1em;
`;
const StyledButton = styled(Button)`
  && {
    color: var(--primary--color) !important;
    font-weight: 500;
  }
`;

interface CreateButtonProps {
  text?: string;
  onClick?: () => void;
}

export const CreateButton = ({ text, onClick }: CreateButtonProps) => {
  return (
    <Container>
      <StyledButton onClick={onClick}>Create {text}</StyledButton>
    </Container>
  );
};
