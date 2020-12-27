import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import WS from "jest-websocket-mock";
import Login from "./login";
import Context from "../../services/global-context-provider/context";

describe('Login page', () => {

    afterEach(() => {
        WS.clean();
    });

    it('should render login page', () => {
        const {container} = render(<Context.Provider value={{setSocket: jest.fn()}}>
            <Login/> </Context.Provider>)

        expect(container).toMatchSnapshot();
    });

    it('should make connection with server over ws protocol', async () => {
        const server = new WS("ws://localhost:8080/ws");
        const mockedFn = jest.fn();
        render(
            <Context.Provider value={{setSocket: mockedFn}}>
                <Login/>
            </Context.Provider>
        )
        await server.connected;

        expect(server.messages).toStrictEqual([]);
        expect(mockedFn).toHaveBeenCalledTimes(1);
    });
});
