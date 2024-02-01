import styled from 'styled-components';

const Container = styled.div`
    max-width: ${({ theme }) => theme.layout.maxWidth};
    margin: 0 auto;
    padding: 0 1rem;
    title: ${(props) => props.theme.title};
    text: ${(props) => props.theme.text};
`;

export default Container;
