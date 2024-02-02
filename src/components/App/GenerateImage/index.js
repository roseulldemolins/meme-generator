import React, { useState, useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import * as htmlToImage from 'html-to-image';
import Button from '../../global/Button';
import Wrapper from './Wrapper';
import Meme from './Meme';
import { func } from 'prop-types';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { memeOptions } from '../../../utils/data';

export const GenerateImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    // Local state
    const [image, setImage] = useState(null);

    // Methods

   
    function generateMeme(s) {
        console.log(s)
        htmlToImage 
            .toJpeg(document.getElementById('active-image'), s)
           

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
            let style = {style:{filter: "grayscale(1)"}}
            console.log(meme.blackAndWhite)
            if (meme.state.blackAndWhite) generateMeme(style)

            else
        
            generateMeme();
        }
        else {
            alert("Filename cannot be empty or above 15 characters.");
        }
    }

    const [selectedMeme, setselectedMeme] = useState(null);
    const handleChange = (event) => {
      setselectedMeme(event.target.value)
      // eslint-disable-next-line no-undef
      const selectedMemeData = memeOptions.find(
        (meme) => meme.name === event.target.value
      );
      meme.dispatch({ type: "IMAGE_SELECTED", payload: selectedMemeData });
    };

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
            <FormControl style={{ minWidth: 220 }} variant="filled">
        <InputLabel id="demo-simple-select-label">Select Memes</InputLabel>
        <Select
          style={{
            backgroundColor: "white",
            borderRadius: "40px",
            height: "45px",
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedMeme}
          label="Memes"
          onChange={handleChange}
        >
          {memeOptions.map((meme) => (
            <MenuItem key={meme.id} value={meme.name}>
              {meme.name}
            </MenuItem>
          ))}

        </Select>
      </FormControl>
            {memeImage}
        </Wrapper>
    );
};

export default GenerateImage;
