import styled from 'styled-components';

const Container = styled.div`
  background: #f5f5f5;
  color: gray;
  height: 60px;
  padding: 20px 0px 0px 10px;
  margin-bottom: 10px;
  text-indent: 0.6em;
`;

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => (
  <Container>{title}</Container>
);

export default SectionTitle;
