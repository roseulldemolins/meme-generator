import React, {useState} from 'react';
import { StateProvider } from '../../context/MemeContext';
import AppWrapper from '../layout/AppWrapper';
import Container from '../layout/Container';
import MainContent from '../layout/MainContent';
import Title from '../global/Title';
import Icon from '../global/Icon';
import logo from '../../assets/app-icon.svg';
import UploadImage from './UploadImage';
import TextImage from './TextImage';
import GenerateImage from './GenerateImage';
import { ThemeProvider } from "styled-components";
import Switch from '../Switch/Switch';
const App = () => {

   
    const darkTheme = {
        body: "#1c1c1c",
        title: "#fff",
       h1: "#Ffc0cb",
       text: "#FAADF1"
        
      };
      const lightTheme = {
        body: "#ff8fab",
        title: "#bd93f9",
        h1: "#bd93f9", 
        text: "#b200ed", 
       
       
      };

      const [theme, setTheme] = useState("dark");
      const isDarkTheme = theme === "dark";
    
      const toggleTheme = () => {
        setTheme(isDarkTheme ? "light" : "dark");
        console.log(isDarkTheme);
      };
    
    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <AppWrapper>
        <Container >
        <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
                <Title primary fsize="2" margin="0 0 2rem">
                    <Icon src={logo} alt="The MEME Generator" />
                    The MEME Generator
                </Title>
               
                {/* Shared global state from here on */}
                <StateProvider>
                    <MainContent>
                    
                        <UploadImage />

                        <TextImage />
                    </MainContent>

                    <GenerateImage />
                </StateProvider>
            </Container>
        </AppWrapper>
        </ThemeProvider>
    );
};

export default App;
