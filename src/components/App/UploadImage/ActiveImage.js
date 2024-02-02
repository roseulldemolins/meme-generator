import React, { useContext } from "react";
import { MemeContext } from "../../../context/MemeContext";
import styled, { css } from "styled-components";
import ImageCaption from "./ImageCaption";
import shortid from "shortid";

// Sub components
const Wrapper = styled.div.attrs({
  id: "active-image",
})`
  position: relative;
  width: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
`;

const Text = styled.div`
  position: ${(props) => (props.outside ? "static" : "absolute")};
  left: 0;
  color: rgb(255, 255, 255);
  width: 100%;
  padding: ${(props) => (props.outside ? "0.25rem 1rem" : "0 1rem")};
  text-transform: uppercase;
  text-align: ${(props) => props.align};
  line-height: 1.2;
  font-weight: ${({ theme }) => theme.typography.bold};
  font-size: ${(props) => props.fsize}em;
  text-shadow: 0px 0px 5px ${({ theme }) => theme.colors.black};
  ${(props) =>
    !props.outside &&
    props.pos === "top" &&
    css`
      top: ${(props) => props.posPlace}%;
      left: ${(props) => props.posPlaceX}%;
      color: ${props.posColour};
    `}
  ${(props) =>
    !props.outside &&
    props.pos === "bottom" &&
    css`
      bottom: ${(props) => props.posPlace}%;
      left: ${(props) => props.posPlaceX}%;
      color: ${props.posColour};
    `}
    font-family: ${(props) => props.fontFamily}
`;

const Image = styled.img.attrs(({ path, altimg }) => ({
  src: path,
  alt: altimg,
}))`
  display: block;
  width: 100%;
`;

// Main Components
const ActiveImage = () => {
  // Global state
  // state to read and dispatch to modify
  const meme = useContext(MemeContext);

  console.log(meme.state.fontSelected);
  console.log(meme.state.imageSelected);

  return (
    <>
      {meme.state.imageSelected.length > 0 ? (
        meme.state.imageSelected.map((image) => (
          <Wrapper key={shortid.generate()}>
            {meme.state.topText && (
              <Text
                pos="top"
                posPlace={meme.state.topTextPos}
                posPlaceX={meme.state.topTextPosX}
                fsize={meme.state.topTextSize}
                align={meme.state.textAlign}
                outside={meme.state.textOutside}
                fontFamily={meme.state.fontSelected}
              >
                {meme.state.topText}
              </Text>
            )}

            
            <Image path={image.path} altimg={image.name}/>

            {meme.state.bottomText && (
              <Text
                pos="bottom"
                posPlace={meme.state.bottomTextPos}
                posPlaceX={meme.state.bottomTextPosX}
                fsize={meme.state.bottomTextSize}
                align={meme.state.textAlign}
                outside={meme.state.textOutside}
                fontFamily={meme.state.fontSelected}
              >
                {meme.state.bottomText}
              </Text>
            )}
            <ImageCaption image={image} />
          </Wrapper>
        ))
      ) : (
        <Wrapper>
          {meme.state.topText && (
            <Text
              pos="top"
              posPlace={meme.state.topTextPos}
              posPlaceX={meme.state.topTextPosX}
              fsize={meme.state.topTextSize}
              outside={meme.state.textOutside}
            >
              {meme.state.topText}
            </Text>
          )}
          <Image
            path={
              meme.state.imageSelected.base64
                ? meme.state.imageSelected.base64
                : meme.state.imageSelected.path
            }
            altimg={meme.state.imageSelected.name}
          />
          {meme.state.bottomText && (
            <Text
              pos="bottom"
              posPlace={meme.state.bottomTextPos}
              posPlaceX={meme.state.bottomTextPosX}
              fsize={meme.state.bottomTextSize}
              outside={meme.state.textOutside}
            >
              {meme.state.bottomText}
            </Text>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default ActiveImage;
