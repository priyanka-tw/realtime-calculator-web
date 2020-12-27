import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import 'jest-styled-components';
import Keypad from "./keypad";

describe('Keypad', () => {
    const mockFn = jest.fn();

    it('should render the component with default prop', () => {
        const {container} = render(<Keypad onClick={mockFn}/>);

        expect(container).toMatchSnapshot();
    });

    it('should perform the given action on click of a button', async () => {
        const {getByTestId} = render(<Keypad onClick={mockFn}/>);

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-1'));
        });

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith("1");
    });

});
