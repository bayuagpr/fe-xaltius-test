import styled from "styled-components";

const Spacer = styled.div`
  height: ${(props) => (props.height ? `${props.height}px` : "20px")};
`;

export default Spacer;
