import styled, { css } from 'styled-components';
const Span = styled.span`
display: block;
margin-bottom: 0.5rem;
color: ${(props) => props.theme.span};
span {
    display: inline-block;
    transform: translateY(-1px);
    font-size: 0.75em;
    color: ${({ theme }) => theme.colors.black};
}
`;

export default Span;
