import React, { useContext } from 'react';
import { MemeContext } from '../../../context/MemeContext';
import TextWrapper from './TextWrapper';
import TextLegenda from './TextLegenda';
import Title from '../../global/Title';
import WrapInput from '../../global/form/WrapInput';
import Label from '../../global/form/Label';
import Input from '../../global/form/Input';
import Range from '../../global/form/Range';
import Switch from '../../global/form/Switch';
import Radio from '../../global/form/Radio';




const TextImage = () => {
    // Global state
    // state to read and dispatch to modify
    const meme = useContext(MemeContext);

    const handleTopText = input => {
        meme.dispatch({ type: 'UPDATE_TOP', payload: limitWordsInString(input,meme.state.topTextSize) });
    };

    const limitWordsInString = (inputText,textSize) =>{
        let words = inputText.split(' ')
        let output = []
        //rough calculation for how many characters we can fit in one word based on textsize
        let maxWordLength = (45 / textSize)-1

        //work out max x offset based on characters in line a line how?
        

        words.forEach((word,i) => {
            if(word.length > maxWordLength){
                let trimmedWord = word.slice(0,maxWordLength)
                output.push(trimmedWord)
            }else {
                output.push(word)
            }
        });
        return output.join(' ')
    }

    const handleBottomText = input => {
        meme.dispatch({ type: 'UPDATE_BOTTOM', payload: limitWordsInString(input,meme.state.bottomTextSize) });
    };

    const handleTextPos = (e, pos) => {
        if (pos === 'top') {
            meme.dispatch({ type: 'UPDATE_TOP_POS', payload: e.target.value });
        } else {
            meme.dispatch({
                type: 'UPDATE_BOTTOM_POS',
                payload: e.target.value,
            });
        }
    };

    //add x-position for text
    const handleTextPosXAxis = (e, pos) => {
        if (pos === 'top') {
            meme.dispatch({ type: 'UPDATE_TOP_POS_X', payload: e.target.value });
        } else {
            meme.dispatch({
                type: 'UPDATE_BOTTOM_POS_X',
                payload: e.target.value,
            });
        }
    };

    //add alignment for text
    const handleTextAlignment = (align) => {

        //Set X values to zero
        meme.dispatch({ type: 'UPDATE_TOP_POS_X', payload: 0});
        meme.dispatch({ type: 'UPDATE_BOTTOM_POS_X', payload: 0});

        if (align === 'left') {
            meme.dispatch({ type: 'UPDATE_TEXT_ALIGN', payload: align });
        }
        else if (align === 'center') {
            meme.dispatch({ type: 'UPDATE_TEXT_ALIGN', payload: align });
        }
        else if (align === 'right') {
            meme.dispatch({ type: 'UPDATE_TEXT_ALIGN', payload: align});
        }
    };

    const handleTextSize = (e, pos) => {
        if (pos === 'top') {
            meme.dispatch({ type: 'UPDATE_TOP_SIZE', payload: e.target.value });
            handleTopText(meme.state.topText)
        } else {
            meme.dispatch({
                type: 'UPDATE_BOTTOM_SIZE',
                payload: e.target.value,
            });
            handleBottomText(meme.state.bottomText)
        }
    };

    const handleTextOutside = e => {
        meme.dispatch({ type: 'TEXT_OUTSIDE' });
    };

    const handleFilename = e => {
        meme.dispatch({ type: 'UPDATE_FILENAME', payload: e.target.value });
    };

    // Render
    return (
        <TextWrapper className={meme.state.imageSelected ? 'active' : ''}>
            <Title as="h3" fsize="1.5" margin="0 0 1rem">
                Set your text here
            </Title>

            {/* Top Text */}
            <WrapInput>
                <Label primary htmlFor="text-top">
                    Top text
                </Label>
                <Input
                    intype="text"
                    id="text-top"
                    onChange={e=>handleTopText(e.target.value)}
                    value={meme.state.topText}
                    disabled={!meme.state.imageSelected}
                />
            </WrapInput>

            <WrapInput flex>
                <div className={meme.state.textOutside ? 'inactive' : ''}>
                    <Label htmlFor="pos-top">
                        Text position Y-Axis <span>[ {meme.state.topTextPos} ]</span>
                    </Label>
                    <Range
                        id="pos-top"
                        min="0"
                        max="50"
                        value={meme.state.topTextPos}
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onChange={e => handleTextPos(e, 'top')}
                    />
                </div>

                {/* For changing x-position of text */}
                <div className={meme.state.textOutside ? 'inactive' : ''}>
                    <Label htmlFor="pos-top-X">
                        Text position X-Axis <span>[ {meme.state.topTextPosX} ]</span>
                    </Label>
                    <Range
                        id="pos-top-X"
                        min="-30"
                        max="30"
                        value={meme.state.topTextPosX}
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onChange={e => handleTextPosXAxis(e, 'top')}
                    />
                </div>
                <div>
                    <Label htmlFor="size-top">
                        Text size <span>[ {meme.state.topTextSize} ]</span>
                    </Label>
                    <Range
                        id="size-top"
                        min="1"
                        max="4"
                        step="0.1"
                        value={meme.state.topTextSize}
                        disabled={!meme.state.imageSelected}
                        onChange={e => handleTextSize(e, 'top')}
                    />
                </div>
            </WrapInput>

            {/* Bottom Text */}
            <WrapInput>
                <Label primary htmlFor="text-bottom">
                    Bottom text
                </Label>
                <Input
                    intype="text"
                    id="text-bottom"
                    onChange={e=>handleBottomText(e.target.value)}
                    value={meme.state.bottomText}
                    disabled={!meme.state.imageSelected}
                />
            </WrapInput>

            <WrapInput flex>
                <div className={meme.state.textOutside ? 'inactive' : ''}>
                    <Label htmlFor="pos-bottom">
                        Text position Y-Axis {' '}
                        <span>[ {meme.state.bottomTextPos} ]</span>
                    </Label>
                    <Range
                        id="pos-bottom"
                        min="0"
                        max="50"
                        value={meme.state.bottomTextPos}
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onChange={e => handleTextPos(e, 'bottom')}
                    />
                </div>
                {/* For changing x-position of text */}
                <div className={meme.state.textOutside ? 'inactive' : ''}>
                    <Label htmlFor="pos-bottom-X">
                        Text position X-Axis <span>[ {meme.state.bottomTextPosX} ]</span>
                    </Label>
                    <Range
                        id="pos-bottom-X"
                        min="-30"
                        max="30"
                        value={meme.state.bottomTextPosX}
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onChange={e => handleTextPosXAxis(e, 'bottom')}
                    />
                </div>

                
                <div>
                    <Label htmlFor="size-bottom">
                        Text size <span>[ {meme.state.bottomTextSize} ]</span>
                    </Label>
                    <Range
                        id="size-bottom"
                        min="1"
                        max="4"
                        step="0.1"
                        value={meme.state.bottomTextSize}
                        disabled={!meme.state.imageSelected}
                        onChange={e => handleTextSize(e, 'bottom')}
                    />
                </div>
            </WrapInput>

            {/* Text alignment buttons */}
            <WrapInput>
                <Label htmlFor="text-align">
                            Text Align <span>[ {meme.state.textAlign} ]</span>
                </Label>
                <Radio 
                        id="left-bottom-X"
                        value="Align Left"
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onClick = {() => handleTextAlignment('left')}
                        />
                <Radio 
                        id="center-bottom-X"
                        value="Align Center"
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onClick = {() => handleTextAlignment('center')}
                />
                <Radio 
                        id="center-right-X"
                        value="Align Right"
                        disabled={
                            !meme.state.imageSelected || meme.state.textOutside
                        }
                        onClick = {() => handleTextAlignment('right')}
                />

            </WrapInput>

            
            {/* Text outside */}
            <WrapInput>
                <Switch
                    primary={true}
                    label="Text outside the image"
                    checked={meme.state.textOutside}
                    disabled={!meme.state.imageSelected}
                    onSwitch={handleTextOutside}
                />
            </WrapInput>

            <TextLegenda>* Both of the above texts are optional.</TextLegenda>

            {/* Filename input */}
            <WrapInput>
                <br />
                <Label primary htmlFor="filenameInput">
                    Filename
                </Label>
                <Input
                    intype="text"
                    id="filenameInput"
                    onChange={handleFilename}
                    value={meme.state.filename}
                    disabled={!meme.state.imageSelected}
                />
            </WrapInput>
        </TextWrapper>
    );
};

export default TextImage;
