import React from 'react';
import PropTypes from 'prop-types';
import StyledBubble from './bubble.style';

const Bubble = ({data}) => {
    return (
        <StyledBubble>{data}</StyledBubble>
    );
};

Bubble.propTypes = {
    data: PropTypes.string.isRequired
};

export default Bubble;