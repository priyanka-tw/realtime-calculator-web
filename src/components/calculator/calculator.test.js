import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import 'jest-styled-components';
import Calculator from "./calculator";

describe('Calculator', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should render the component', () => {
        const {container} = render(<Calculator/>);

        expect(container).toMatchSnapshot();
    });

    it('should display the clicked digits on screen', async () => {
        const {getByTestId} = render(<Calculator/>);

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-1'));
        });
        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-3'));
        });

        expect(getByTestId('output-screen').value).toStrictEqual('13');
    });

    it('should reset the screen on click of `AC`', async () => {
        const {getByTestId} = render(<Calculator/>);

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-1'));
        });
        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-3'));
        });
        expect(getByTestId('output-screen').value).toStrictEqual('13');

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-AC'));
        });
        expect(getByTestId('output-screen').value).toStrictEqual('');
    });

    it('should backspace by one on click of `C`', async () => {
        const {getByTestId} = render(<Calculator/>);

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-1'));
        });
        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-3'));
        });
        expect(getByTestId('output-screen').value).toStrictEqual('13');

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-C'));
        });
        expect(getByTestId('output-screen').value).toStrictEqual('1');
    });

    it('should make api call to calculate expression on click of `=`', async () => {
        fetch.mockResponseOnce(JSON.stringify({expression: "13+5", result: "18"}));
        const {getByTestId} = render(<Calculator/>);

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-1'));
            await fireEvent.click(getByTestId('calc-button-3'));
            await fireEvent.click(getByTestId('calc-button-+'));
            await fireEvent.click(getByTestId('calc-button-5'));
        });

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-='));
        });

        expect(getByTestId('output-screen').value).toStrictEqual('18');
    });

    it('should show error bubble if got error response from api', async () => {
        jest.useFakeTimers();
        fetch.mockReject(() => Promise.reject("API is down"));
        const {getByTestId, queryByText, container} = render(<Calculator/>);

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-1'));
        });
        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-3'));
        });
        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-+'));
        });
        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-5'));
        });

        await act(async () => {
            await fireEvent.click(getByTestId('calc-button-='));
        });

        expect(getByTestId('output-screen').value).toStrictEqual('13+5');
        expect(queryByText('ERR! Try again')).toBeInTheDocument();
        expect(container).toMatchSnapshot();

        jest.runAllTimers();
        expect(queryByText('ERR! Try again')).not.toBeInTheDocument();
    });

    describe('should check input value', () => {
        it('should not allow to enter multiple operands in row', async () => {
            const {getByTestId} = render(<Calculator/>);

            await act(async () => {
                await fireEvent.click(getByTestId('calc-button-1'));
            });
            await act(async () => {
                await fireEvent.click(getByTestId('calc-button-3'));
            });
            await act(async () => {
                await fireEvent.click(getByTestId('calc-button-+'));
            });
            await act(async () => {
                await fireEvent.click(getByTestId('calc-button-%'));
            });

            expect(getByTestId('output-screen').value).toStrictEqual('13+');
        });

        it('should allow first entry of negative sign', async () => {
            const {getByTestId} = render(<Calculator/>);

            await act(async () => {
                await fireEvent.click(getByTestId('calc-button--'));
            });
            await act(async () => {
                await fireEvent.click(getByTestId('calc-button-2'));
            });

            expect(getByTestId('output-screen').value).toStrictEqual('-2');
        });
    });

});
