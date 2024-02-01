import styled from 'styled-components';

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.label};
    span {
        display: inline-block;
        transform: translateY(-1px);
        font-size: 0.75em;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export default Label;
