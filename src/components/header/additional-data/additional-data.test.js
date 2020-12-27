import React from 'react';
import {act, fireEvent, render} from '@testing-library/react';
import 'jest-styled-components';
import WS from "jest-websocket-mock";
import AdditionalData from "./additional-data";
import Context from "../../../services/global-context-provider/context";

describe('Additional data', () => {

    let server, client;
    const mockedFn = jest.fn();

    beforeEach(async () => {
        server = new WS("ws://localhost:8080/ws", {jsonProtocol: true});
        client = new WebSocket("ws://localhost:8080/ws");
    });

    afterEach(() => {
        WS.clean();
    });

    it('should render the component', async () => {
        const {container} = render(
            <Context.Provider value={{
                username: 'test-username',
                socket: client,
                setUsername: mockedFn
            }}>
                <AdditionalData/>
            </Context.Provider>);
        await server.connected;
        server.send('message');

        expect(container).toMatchSnapshot();
    });

    it('should handle logout on click of logout button', async () => {
        const {getByTestId} = render(
            <Context.Provider value={{
                username: 'test-username',
                socket: client,
                setUsername: mockedFn
            }}>
                <AdditionalData/>
            </Context.Provider>);
        await server.connected;

        await act(async () => {
            await fireEvent.click(getByTestId('logout-button'));
        });

        await expect(server).toReceiveMessage({"data": "test-username", "event": "logout"});
        expect(mockedFn).toHaveBeenCalledWith('');
    });

    it('should update logged in users data according to the message received', async () => {
        const {container} = render(
            <Context.Provider value={{
                username: 'test-username',
                socket: client,
                setUsername: mockedFn
            }}>
                <AdditionalData/>
            </Context.Provider>);
        await server.connected;
        server.send({event: 'logged in users', data: '5'});

        expect(container).toMatchSnapshot();
    });
});
