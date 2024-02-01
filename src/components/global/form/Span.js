import styled, { css } from 'styled-components';
const Span = styled.span`
    margin: ${({ margin }) => margin};
    font-size: ${({ fsize }) => fsize}em;
    color: ${(props) => props.theme.label};

    @media all and (max-width: ${({ theme }) => theme.layout.xsWidth}) {
        ${props =>
            props.primary &&
            css`
                font-size: 1.6em;
                img {
                    display: none;
                }
            `}
    }
`;

export default Span;
