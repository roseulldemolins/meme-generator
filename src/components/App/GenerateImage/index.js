import React, { useState, useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import * as htmlToImage from 'html-to-image';
import Button from '../../global/Button';
import Wrapper from './Wrapper';
import Meme from './Meme';
import { func } from 'prop-types';

export const GenerateImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    // Local state
    const [image, setImage] = useState(null);

    // Methods

   
    function generateMeme() {
        htmlToImage
            .toJpeg(document.getElementById('active-image'), {style:{filter:"grayscale(1)"}})
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                img.crossOrigin = 'anonymous';
                setImage(img.src);
            })
            .catch(function (error) {
                console.error('We have a problem:', error);
            });
    }


    const resetMeme = () => {
        meme.dispatch({ type: 'RESET_MEME' });
        setImage(null);
    };

    const closeMeme = () => {
        setImage(null);
    };

    const validateInput = () => {
        // Validate that the filename given is not empty and contains 15 characters or less
        var filenameInput = document.getElementById('filenameInput').value;
        if (filenameInput !== "" && filenameInput.length <= 15) {
            generateMeme();
        }
        else {
            alert("Filename cannot be empty or above 15 characters.");
        }
    }

    

    // Render
    let memeImage;
    if (image) {
        memeImage = <Meme path={image} close={closeMeme} />;
    }
    return (
        <Wrapper>
            <Button
                primary
                margin="0 1rem 1rem 0"
                handleClick={validateInput}
                isDisabled={!meme.state.imageSelected}
            >
                Generate a new MEME
            </Button>
            <Button
                margin="0 1rem 1rem 0"
                handleClick={resetMeme}
                isDisabled={!meme.state.imageSelected}
            >
                Reset MEME settings
            </Button>
            {memeImage}
        </Wrapper>
    );
};

export default GenerateImage;
