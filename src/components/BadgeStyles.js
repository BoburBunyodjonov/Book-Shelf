import styled from "styled-components";

export const Badge = styled.span`
    background-color: ${props=>props.status === "New" ? "red" : props.status ==="Reading" ? "gold" : "green"};
    padding: 5px 10px;
    border-radius: 7px;
    color: white;
`

