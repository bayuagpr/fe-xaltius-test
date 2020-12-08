import styled from "styled-components";

const ColorBox = styled.div`
  height: 50px;
  width: 50px;
  background-color: ${(props) => props.inputColor || "#FFFFFF"};
  margin: 10px;
`;

export default ColorBox;
