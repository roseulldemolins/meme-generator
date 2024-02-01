import React, { useContext, useEffect } from 'react';
import { MemeContext } from '../../../context/MemeContext';

import ImageWrapper from './ImageWrapper';
import ImageLabel from './ImageLabel';
import ImageInput from './ImageInput';
import ActiveImage from './ActiveImage';
import NoImage from './NoImage';

const  UpdateImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);


    // Set focus at first text input after setting the meme image
    useEffect(() => {
        const firstInput = document.getElementById('text-top');
        firstInput.focus();
        firstInput.select();
    }, [meme.state.imageSelected]);

    const handleLocalImage = e => {

        const images = e.target.files; 
        
        const newImages = createImagesArray(images);

        if (!meme.state.imageSelected) {

            meme.dispatch({ type: 'IMAGE_SELECTED', payload: newImages });

        }
        };

     //helper methods
     const createImagesArray = (images) =>{
        
        const newImages = [];

        if(images.length === 1){
            newImages.push({
                name: images[0].name,
                size: images[0].size,
                path: URL.createObjectURL(images[0])
            });
        }else if(images.length > 1){
                        newImages.push({
            name: images[0].name,
            size: images[0].size,
            path: URL.createObjectURL(images[0])
        });

        newImages.push({
            name: images[1].name,
            size: images[1].size,
            path: URL.createObjectURL(images[1])
        });
        }else{
            throw new Error();
        }

        //code to work with all seleted images
        // for(let i=0; i < images.length; i++){
        //     let image = {
        //         name: null,
        //         size: null,
        //         path: null
        //     }
        //     image.name = images[i].name;
        //     image.size = images[i].size;
        //     image.path = URL.createObjectURL(images[i]);
        //     newImages.push(image);
        // }

        return newImages;
     }
   


    // Render
    let label;
    if (meme.state.imageSelected) {
        label = <ActiveImage />;
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
            <ImageInput onChange={handleLocalImage} onClick={(e)=> {e.currentTarget.value = null}} disabled={meme.state.imageSelected}/>

        </ImageWrapper>
    );
};
export default UpdateImage;
