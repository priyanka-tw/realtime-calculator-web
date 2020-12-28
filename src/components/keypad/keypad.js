import React from 'react';
import PropTypes from 'prop-types';
import {Column, Row} from "./keypad.styles";
import CalcButton from "../calc-button/calc-button";

const Keypad = ({onClick}) => {

    return (
        <>
            <Column>
                <Row>
                    <CalcButton value="AC" onClick={onClick}/>
                    <CalcButton value="C" onClick={onClick}/>
                    <CalcButton value="%" onClick={onClick}/>
                    <CalcButton value="/" isOperation onClick={onClick}/>
                </Row>
                <Row>
                    <CalcButton value="7" onClick={onClick}/>
                    <CalcButton value="8" onClick={onClick}/>
                    <CalcButton value="9" onClick={onClick}/>
                    <CalcButton value="*" isOperation onClick={onClick}/>
                </Row>
                <Row>
                    <CalcButton value="4" onClick={onClick}/>
                    <CalcButton value="5" onClick={onClick}/>
                    <CalcButton value="6" onClick={onClick}/>
                    <CalcButton value="-" isOperation onClick={onClick}/>
                </Row>
                <Row>
                    <CalcButton value="1" onClick={onClick}/>
                    <CalcButton value="2" onClick={onClick}/>
                    <CalcButton value="3" onClick={onClick}/>
                    <CalcButton value="+" isOperation onClick={onClick}/>
                </Row>
                <Row>
                    <CalcButton value="0" onClick={onClick} isZero/>
                    <CalcButton value="=" isEqualTo isZero onClick={onClick}/>
                </Row>
            </Column>
        </>
    );
};

Keypad.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Keypad;