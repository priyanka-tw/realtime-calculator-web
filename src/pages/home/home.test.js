import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import Home from "./home";
import Context from "../../services/global-context-provider/context";
import WS from "jest-websocket-mock";

describe('Home page', () => {
    let server, client;

    beforeEach(async () => {
        server = new WS("ws://localhost:8080/ws", {jsonProtocol: true});
        client = new WebSocket("ws://localhost:8080/ws");
    });

    afterEach(() => {
        WS.clean();
    });

    it('should render home page', async () => {
        const {container} = render(<Context.Provider value={{username: 'test-username', socket: client}}>
            <Home/> </Context.Provider>);
        await server.connected;
        expect(container).toMatchSnapshot();
    });

});
