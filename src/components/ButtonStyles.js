import styled, { css } from "styled-components";

export const Button = styled.button`
  /* Shared styles */
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  /* Filled background */
  ${({ filled }) =>
    filled &&
    css`
    background-color: #6200EE;
    color: #ffffff;
    border: none;
`}

  /* Outline */
  ${({ outlined }) =>
    outlined &&
    css`
    background - color: transparent;
    color: #6200EE;
    border: 2px solid #6200EE;
`}
`;
