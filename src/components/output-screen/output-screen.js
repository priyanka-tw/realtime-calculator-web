import React from 'react';
import StyledInput from "./output-screen.style";
import PropTypes from "prop-types";

const OutputScreen = ({value}) => {

    //add regex check

    return (
        <StyledInput value={value} readOnly data-testid="output-screen"/>
    );
};

OutputScreen.propTypes = {
    value: PropTypes.string.isRequired,
};

export default OutputScreen;