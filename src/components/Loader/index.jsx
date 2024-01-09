import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    height: 30%;
  }
  40%, 70% {
    height: 100%;
  }
  100% {
    height: 30%;
  }
`;

const StyledLoader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  height: 70px;
`;

const StyledLoadingBar = styled.div`
  display: flex;
  align-items: flex-end;
  width: 50px;
  height: 100%;
  background-color: rgba(238, 238, 238, 0.92); /* 8% darken effect */
  box-shadow: inset 0 0 4px rgba(238, 238, 238, 0.84); /* 16% darken effect */
  border-radius: 8px;
  transform: translateZ(0);
  overflow: hidden;

  &:before {
    content: '';
    width: 100%;
    height: 30%;
    background: linear-gradient(rgb(52, 136, 192), rgb(52, 136, 192, 0.84)); /* 16% darken effect */
    animation: ${loadingAnimation} 1.8s infinite;
  }

  &:nth-child(2):before {
    animation-delay: 0.2s;
  }

  &:nth-child(3):before {
    animation-delay: 0.4s;
  }
`;

const Loader = () => {
  return (
    <StyledLoader>
      <StyledLoadingBar></StyledLoadingBar>
      <StyledLoadingBar></StyledLoadingBar>
      <StyledLoadingBar></StyledLoadingBar>
    </StyledLoader>
  );
};

export default Loader;
