import styled from 'styled-components';
import BackgroundImage from '../assets/images/bg.jpg';

const Container = styled.div `
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
`;

export const CenterContainer = styled(Container)`
display: grid;
place-items: center;
`

export default Container;