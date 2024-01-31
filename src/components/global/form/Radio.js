import styled from 'styled-components';

const Radio = styled.input.attrs({
    type: 'radio',
})`
        height: 1.125rem;
        width: 1.125rem;
        border: 1px solid #b9bdcf;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-right: 0.4rem;
        transition: background 0.15s, border-color 0.15s;
        padding: 2px;

        &::after {
            content: "";
            width: 100%;
            height: 100%;
            display: block;
            background: #2266dc;
            border-radius: 50%;
            cursor: pointer;
            transform: scale(0);
          }
        
`;

export default Radio;

/*export const RadioGroup = styled.input`
  display: none;
  &:checked + ${Radio} {
      &::after {
        transform: scale(1);
      }
`;*/


