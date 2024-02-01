import React, { useContext, useEffect, useState } from "react";
import { MemeContext } from "../../../context/MemeContext";
import { Button } from "@mui/material";

import ImageWrapper from "./ImageWrapper";
import ImageLabel from "./ImageLabel";
import ImageInput from "./ImageInput";
import ImageCaption from "./ImageCaption";
import ActiveImage from "./ActiveImage";
import NoImage from "./NoImage";
const UpdateImage = () => {
  // Global state
  // state to read and dispatch to modify
  const meme = useContext(MemeContext);

  // Set focus at first text input after setting the meme image
  useEffect(() => {
    const firstInput = document.getElementById("text-top");
    firstInput.focus();
    firstInput.select();
  }, [meme.state.imageSelected]);

  const handleLocalImage = (e) => {
    const img = e.target.files[0];

    const newImage = {
      name: img.name,
      size: img.size,
      path: URL.createObjectURL(img),
    };

    console.log(img);
    console.log(newImage.path);

    if (!meme.state.imageSelected) {
      meme.dispatch({ type: "IMAGE_SELECTED", payload: newImage });
    }
  };

  //to avoid generate the same image as the previous one
  var [lastRandomNumber,setLastRandomNumber] = useState(0)

  const handleRandomMeme = (e) => {
    e.currentTarget.value = null;
    // Math.floor(Math.random() * (max - min + 1)) + min , in this case we choose from 1 and 5
    var randomNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    while(randomNumber===lastRandomNumber){
        randomNumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    }
    setLastRandomNumber(randomNumber)

    var path = "";
    var name = "";

    switch (randomNumber) {
      case 1:
        path =
          "https://indianmemetemplates.com/wp-content/uploads/troll-face.jpg";
        name = "troll-face";
        break;
      case 2:
        path =
          "https://indianmemetemplates.com/wp-content/uploads/true-story.jpg";
        name = "true-story";
        break;
      case 3:
        path = "https://indianmemetemplates.com/wp-content/uploads/lol.jpg";
        name = "lol";
        break;
      case 4:
        path =
          "https://indianmemetemplates.com/wp-content/uploads/Puking-Rainbows.jpg";
        name = "Puking-Rainbows";
        break;
      case 5:
        path =
          "https://indianmemetemplates.com/wp-content/uploads/Aww-Yeah.jpg";
        name = "Aww-Yeah";
        break;
      default:
        return;
    }
    console.log("the path is:" + path);

    const newImage = {
      name: name,
      path: path,
    };

    meme.dispatch({ type: "IMAGE_SELECTED", payload: newImage });
  };

  // Render
  let label, caption;
  if (meme.state.imageSelected) {
    label = <ActiveImage />;
    caption = <ImageCaption />;
  } else {
    label = <NoImage>Upload an image from your computer</NoImage>;
  }

  return (
    <>
      <ImageWrapper>
        <ImageLabel active={meme.state.imageSelected !== null}>
          {label}
        </ImageLabel>

        {/* the corresponding input component needs to have the onClick atribute set to 
            null the value of the event object ref: https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component */}
        <ImageInput
          onChange={handleLocalImage}
          onClick={(e) => {
            e.currentTarget.value = null;
          }}
          disabled={meme.state.imageSelected}
        />
        {caption}
        
      <Button variant="contained" margin="0 1rem 1rem 0" onClick={(e) => {handleRandomMeme(e);}}>Random Meme</Button>
      </ImageWrapper>
    </>
  );
};
export default UpdateImage;
