import React from 'react';
import PropTypes from 'prop-types';
import StyledDigitButton from "./calc-button.styles";

const CalcButton = ({value, onClick, isOperation, isEqualTo, isZero}) => {
    return (
        <StyledDigitButton
            name={value}
            type="button"
            onClick={(event) => onClick(event.target.name)}
            data-testid={`digit-button-${value}`}
            isOperation={isOperation}
            isEqualTo={isEqualTo}
            isZero={isZero}
        >{value}
        </StyledDigitButton>
    );
}
CalcButton.props = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isOperation: PropTypes.bool,
    isEqualTo: PropTypes.bool,
    isZero: PropTypes.bool
}

CalcButton.defaultProps = {
    isOperation: false,
    isEqualTo: false,
    isZero: false
}

export default CalcButton;