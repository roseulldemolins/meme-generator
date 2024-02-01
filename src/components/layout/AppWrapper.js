import styled from 'styled-components';

const AppWrapper = styled.div`
    margin: 3rem 0;
    background-color: ${(props) => props.theme.body};
    text: ${(props) => props.theme.text};
    title: ${(props) => props.theme.title};
    body{
        color: ${( props) => props.theme.colors.text};
    }
    transition: all 0.25s ease;
    @media all and (max-width: ${({ theme }) => theme.layout.smWidth}) {
        margin: 1rem 0;
    }
`;

export default AppWrapper;
