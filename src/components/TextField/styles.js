import styled from "styled-components";

const Text = styled.p`
  margin: 8px auto;
`;

const Error = styled(Text)`
  font-size: 12px;
  color: red;
`;

const StyledInput = styled.input`
  font-size: 14px;
  padding: 10px 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  border-color: ${(props) => (props.error ? "red" : "black")};
`;

export { Text, Error, StyledInput };
