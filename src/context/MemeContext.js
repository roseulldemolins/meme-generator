import React, { createContext, useReducer } from 'react';

const initialState = {
    topText: 'Top Text',
    topTextPos: 5,
    topTextSize: 2,
    topTextColour:"rgb(255, 255, 255)",
    bottomText: 'Bottom Text',
    bottomTextPos: 5,
    bottomTextSize: 2,
    bottomTextColour:"rgb(255, 255, 255)",
    textOutside: false,
    imageSelected: null
};

const MemeContext = createContext(initialState);
const { Provider } = MemeContext;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        // ACTIONS
        switch (action.type) {
            case 'UPDATE_TOP':
                return {
                    ...state,
                    topText: action.payload,
                };
            case 'UPDATE_BOTTOM':
                return {
                    ...state,
                    bottomText: action.payload,
                };
            case 'UPDATE_TOP_POS':
                return {
                    ...state,
                    topTextPos: action.payload,
                };
            case 'UPDATE_BOTTOM_POS':
                return {
                    ...state,
                    bottomTextPos: action.payload,
                };
            case 'UPDATE_TOP_SIZE':
                return {
                    ...state,
                    topTextSize: action.payload,
                };
            case 'UPDATE_BOTTOM_SIZE':
                return {
                    ...state,
                    bottomTextSize: action.payload,
                };
                case 'UPDATE_TOP_COLOUR':
                return {
                    ...state,
                    topTextColour: action.payload,
                };
            case 'UPDATE_BOTTOM_COLOUR':
                return {
                    ...state,
                    bottomTextColour: action.payload,
                };
            case 'TEXT_OUTSIDE':
                return {
                    ...state,
                    textOutside: !state.textOutside,
                };
            case 'IMAGE_SELECTED':
                return {
                    ...state,
                    imageSelected: action.payload,
                };
            case 'RESET_MEME':
                return initialState;
            default:
                throw new Error();
        }
    }, initialState);
    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { MemeContext, StateProvider };
