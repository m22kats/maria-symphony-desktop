import { Button } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  text-align: right;
  margin-bottom: 1em;
`;
const StyledButton = styled(Button)`
  && {
    color: #ff3f36 !important;
    font-weight: 500;
  }
`;

interface DeleteButtonProps {
  text?: string;
  onClick?: () => void;
}

export const DeleteButton = ({ text, onClick }: DeleteButtonProps) => (
  <Container>
    <StyledButton onClick={onClick}>Delete {text}</StyledButton>
  </Container>
);
