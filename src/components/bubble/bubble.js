import React from 'react';
import PropTypes from 'prop-types';
import StyledBubble from './bubble.style';

const Bubble = ({data, isError}) => {
    return (
        <StyledBubble isError={isError}>{data}</StyledBubble>
    );
};

Bubble.propTypes = {
    data: PropTypes.string.isRequired,
    isError: PropTypes.bool
};

Bubble.default = {
    isError: false
};

export default Bubble;