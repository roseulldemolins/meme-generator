import styled, { css } from 'styled-components';

const Title = styled.h1`
    margin: ${({ margin }) => margin};
    font-size: ${({ fsize }) => fsize}em;
    color: white;

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

export default Title;
