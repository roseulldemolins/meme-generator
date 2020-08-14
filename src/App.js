import React from 'react';
import styled from 'styled-components';
import Container from './components/Container';
import Title from './components/Title';
import Button from './components/Button';

const AppStyles = styled.div`
    margin: 3rem 0;
`;

const App = () => {
    return (
        <AppStyles>
            <Container>
                <Title size="2" margin="0 0 2rem">
                    MEME Generator
                </Title>

                <Title as="h2" size="1.5" margin="0 0 1rem">
                    What do you want to do?
                </Title>
                <Button primary margin="0 1rem 1rem 0">
                    Generate a new MEME
                </Button>
                <Button>View Gallery</Button>
            </Container>
        </AppStyles>
    );
};

export default App;
