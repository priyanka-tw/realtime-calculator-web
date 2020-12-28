import React, {useState, useEffect} from 'react';
import Keypad from "../../components/keypad/keypad";
import OutputScreen from "../output-screen/output-screen";
import Wrapper from "./calculator.styles";
import {URLS} from "../../constants/constants";
import Bubble from "../bubble/bubble";

const Calculator = () => {

    const [currentValue, setCurrentValue] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const aRegex = /^-?(\d+)?[-+*/%=]?\d*?$/g;
        const isValid = currentValue.match(aRegex);

        let testVariable;
        if (isValid) {
            testVariable = currentValue;
        } else {
            testVariable = currentValue.slice(0, currentValue.length - 1);
        }

        setCurrentValue(testVariable);
    }, [currentValue]);

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
            .catch(e => {
                setIsError(true);
                setTimeout(() => setIsError(false), 3000);
                console.log("error encountered while calling calculate: ", e);
            });
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
            {isError && <Bubble data={"ERR! Try again"} isError testId="error-bubble"/>}
        </Wrapper>
    );
};

export default Calculator;