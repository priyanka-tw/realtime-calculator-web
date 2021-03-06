import styled from "styled-components";

const StyledBubble = styled.div`
  width: 200px;
  margin: 10px auto;
  border: 3px solid black;
  padding: 10px;
  text-align: center;
  font-size: 14pt;
  color: black;
  font-family: verdana;
  border-radius: 25px;
  width: max-content;
  
   ${({ isError }) => isError && `
    color: white;
    background-color: #ff0000e6;
    border: none;
  `}
`;

export default StyledBubble;