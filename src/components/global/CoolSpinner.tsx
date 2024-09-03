import styled, { keyframes } from 'styled-components';

const spinning82341 = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: relative;
  background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
  width: 50%;
  max-width: 5em;
  aspect-ratio: 1/1;
  animation: ${spinning82341} 1.7s linear infinite;
  text-align: center;
  border-radius: 50%;
  filter: blur(1px);
  box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
`;

const Spinner1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  aspect-ratio: 1/1;


  background-color: rgb(36, 36, 36);
  border-radius: 50%;
  filter: blur(10px);
`;

export default function CoolSpinner() {
  return (
    <Spinner>
      <Spinner1 />
    </Spinner>
  );
}