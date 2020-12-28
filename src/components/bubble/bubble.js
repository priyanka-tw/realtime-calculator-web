import React from 'react';
import PropTypes from 'prop-types';
import StyledBubble from './bubble.style';

const Bubble = ({data, isError, testId}) => {
    return (
        <StyledBubble isError={isError} data-testid={testId}>{data}</StyledBubble>
    );
};

Bubble.propTypes = {
    data: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    testId: PropTypes.string
};

Bubble.default = {
    isError: false,
    testId: 'bubble'
};

export default Bubble;