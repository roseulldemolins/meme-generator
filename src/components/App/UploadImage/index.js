import React, { useContext, useEffect } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import ImageWrapper from './ImageWrapper';
import ImageLabel from './ImageLabel';
import ImageInput from './ImageInput';
import ImageCaption from './ImageCaption';
import ActiveImage from './ActiveImage';
import NoImage from './NoImage';

const UpdateImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);


    // Set focus at first text input after setting the meme image
    useEffect(() => {
        const firstInput = document.getElementById('text-top');
        firstInput.focus();
        firstInput.select();
    }, [meme.state.imageSelected]);

    // Methods
    const handleLocalImage = e => {

        const img = e.target.files[0];

        const newImage = {
            name: img.name,
            size: img.size,
            path: URL.createObjectURL(img),
        };


        if (!meme.state.imageSelected) {

            meme.dispatch({ type: 'IMAGE_SELECTED', payload: newImage });
            
        }
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
        <ImageWrapper>
            <ImageLabel active={meme.state.imageSelected !== null}>
                {label}
            </ImageLabel>

            {/* the corresponding input component needs to have the onClick atribute set to 
            null the value of the event object ref: https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component */}
            <ImageInput onChange={handleLocalImage} onClick={(e)=> {e.currentTarget.value = null}} id='image-input' disabled={meme.state.imageSelected}/>
            {caption}
        </ImageWrapper>
    );
};
export default UpdateImage;
