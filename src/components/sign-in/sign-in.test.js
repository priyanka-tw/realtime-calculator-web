import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import 'jest-styled-components';
import WS from "jest-websocket-mock";
import SignIn from "./sign-in";
import Context from "../../services/global-context-provider/context";


describe('SignIn', () => {
    const mockedFn = jest.fn();
    it('should render the component', () => {

        const {container} = render(<SignIn />)

        expect(container).toMatchSnapshot();
    });

    it('should navigate trigger event on ws of login on click of start', async () => {
       const server = new WS("ws://localhost:8080/ws", { jsonProtocol: true });
        const client = new WebSocket("ws://localhost:8080/ws");

        const {getByTestId} = render(
            <Context.Provider value={{setUsername: mockedFn, socket: client}}>
            <SignIn />
            </Context.Provider>)

        await server.connected;
        await act(async () => {
            await fireEvent.change(getByTestId('username'), {target: {value: 'this-is-a-sample-username'}})
            await fireEvent.click(getByTestId('start-button'))
        })

        expect(mockedFn).toHaveBeenCalledWith('this-is-a-sample-username');
        await expect(server).toReceiveMessage({"data": "this-is-a-sample-username", "event": "login"});
    });
});
