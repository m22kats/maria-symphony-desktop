import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0px 20px 0px;
  text-align: center;
  font-weight: 500;
  color: grey;
`;

interface TotalCountProps {
  count: number;
}

const TotalCount = ({ count }: TotalCountProps) => {
  return <Container>Total Count: {count}</Container>;
};

export default TotalCount;
