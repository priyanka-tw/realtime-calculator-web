import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import WS from "jest-websocket-mock";
import Login from "./login";

describe('Login page', () => {

    afterEach(() => {
        WS.clean();
    });

    it('should render login page', () => {
        const {container} = render(<Login/>)

        expect(container).toMatchSnapshot();
    });

    it('should make connection with server over ws protocol', async () => {
        const server = new WS("ws://localhost:8080/ws");
        render(<Login/>)
        await server.connected;

        expect(server.messages).toStrictEqual([]);
    });
});
