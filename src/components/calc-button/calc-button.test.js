import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import 'jest-styled-components';
import CalcButton from "./calc-button";

describe('Calc Button', () => {
    const mockFn = jest.fn();

    it('should render the component with given value and default props', () => {
        const {container} = render(<CalcButton value="1" onClick={mockFn}/>);

        expect(container).toMatchSnapshot();
    });

    it('should render the component with given value as an operation', () => {
        const {container} = render(<CalcButton value="+" isOperation/>);

        expect(container).toMatchSnapshot();
    });


    it('should render the component for equal button', () => {
        const {container} = render(<CalcButton value="=" isEqualTo/>);

        expect(container).toMatchSnapshot();
    });

    it('should perform the given action on click of button', async () => {
        const {getByTestId} = render(<CalcButton value="1" onClick={mockFn}/>);

        await act(async () => {
            await fireEvent.click(getByTestId('digit-button-1'));
        });

        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should render the component for zero button', async () => {
        const {container} = render(<CalcButton value="0" isZero/>);

        expect(container).toMatchSnapshot();
    });
});
