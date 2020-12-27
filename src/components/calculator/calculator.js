import React, {useState} from 'react';
import Keypad from "../../components/keypad/keypad";
import OutputScreen from "../output-screen/output-screen";
import Wrapper from "./calculator.styles";
import {URLS} from "../../constants/constants";

const Calculator = () => {

    const [currentValue, setCurrentValue] = useState('');

    const reset = () => {
        setCurrentValue('');
    };
    const backspace = () => {
        setCurrentValue(currentValue.slice(0, -1));
    };
    const calculate = () => {
        fetch(URLS.CALCULATE, {
            method: 'POST',
            body: JSON.stringify({expression: currentValue}),
        }).then(resp => resp.json())
            .then(result => setCurrentValue(result?.result))
            .catch(e => console.log("error encountered while calling calculate: ", e));
    };

    const onClick = (value) => {
        if (value === "=") {
            calculate();
        } else if (value === "AC") {
            reset();
        } else if (value === "C") {
            backspace();
        } else {
            setCurrentValue(currentValue + value);
        }
    };

    return (
        <Wrapper>
            <OutputScreen value={currentValue}/>
            <Keypad onClick={onClick}/>
        </Wrapper>
    );
};

export default Calculator;