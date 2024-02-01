import styled from 'styled-components';

const MainContent = styled.section`
    display: flex;
    margin-bottom: 3rem;
    text: ${(props) => props.theme.text};
    @media all and (max-width: ${({ theme }) => theme.layout.smWidth}) {
        flex-direction: column;
    }
`;

export default MainContent;
