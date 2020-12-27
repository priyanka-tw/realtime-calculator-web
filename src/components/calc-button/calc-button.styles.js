import styled from 'styled-components';

const StyledDigitButton = styled.button`        
    font-size: 16pt;
    font-family: verdana;
    min-width: 60px;
    height: 60px;
    outline: none;
    background-color: black;
    color: white;
    cursor: pointer;
    border:  1px solid #80808054;
    
    ${({ isOperation }) => isOperation && `
    color: #ffc107;
  `}
  
  ${({ isEqualTo }) => isEqualTo && `
    background-color: #ffc107;
  `}
    
  ${({ isZero }) => isZero && `
    min-width: 120px;
  `}
`;

export default StyledDigitButton;