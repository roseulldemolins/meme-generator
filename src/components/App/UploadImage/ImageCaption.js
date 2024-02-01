import React from 'react';
import styled from 'styled-components';
import { formatSizeUnits } from '../../../utils';

const Caption = styled.div`
    margin-bottom: 0;
    p {
        font-size: 0.875em;
        b {
            font-weight: ${({ theme }) => theme.typography.normal};
            color: ${({ theme }) => theme.colors.quaternary};
        }
    }
`;

const ImageCaption = ({image}) => {

    return (
        <Caption>
            <p>
                <b>Image name:</b> {image.name}
            </p>
            <p>
                <b>Image size:</b>{' '}
                {formatSizeUnits(image.size)}
            </p>
        </Caption>
    );
};

export default ImageCaption;
