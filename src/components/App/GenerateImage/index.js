/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as htmlToImage from 'html-to-image';
import Button from '../../global/Button';
import Wrapper from './Wrapper';
import Meme from './Meme';


export const GenerateImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    // Local state
    const [image, setImage] = useState(null);
  
    const [selectedMeme, setselectedMeme]= useState(null);
    const handleChange = (event) => {
        const selectedMemeName= event.target.value;
        // eslint-disable-next-line no-undef
        const selectedMemeData= memeOptions.find((meme)=> meme.name===selectedMemeName);
        setselectedMeme(selectedMemeData);
      };

      
    const memeOptions = [
            {
                id: 1,
                name: 'Tree',
                base64: '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'
            }
        ]
     

    // Methods
    function generateMeme() {
        htmlToImage
            .toPng(document.getElementById('active-image'))
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
            
        <FormControl style={{minWidth: 220, }} variant="filled" >
  <InputLabel id="demo-simple-select-label">Select Memes</InputLabel>
  <Select  style= {{backgroundColor: "white", borderRadius:"40px", height: "45px"}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={meme}
    label="Memes"
    onChange={handleChange}
  >
    
    
    {memeOptions.map((meme)=> (
        <MenuItem key={meme.name} value ={meme.name}>{meme.name}</MenuItem>
    ))}
    <MenuItem value={"Meme2"}>Meme2</MenuItem>
    <MenuItem value={"Meme3"}>Meme3</MenuItem>
    <MenuItem value={"Meme4"}>Meme3</MenuItem>
    <MenuItem value={"Meme5"}>Meme3</MenuItem>
  </Select>
</FormControl>
<OurComponent>

            {selectedMeme && (
        
               <div>
                    <p>Selected Meme : {selectedMeme.name}</p>
                    <img src={`data:image/png;base64,${selectedMeme.base64}`} alt ={selectedMeme.name}/>
                </div>
            )}
            <OurComponent/>
        </Wrapper>
    );
};

export default GenerateImage;
