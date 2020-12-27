import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import Context from "../../services/global-context-provider/context";
import Webpage from "./webpage";
import WS from "jest-websocket-mock";

describe('Webpage', () => {
    let server, client;

    beforeEach(async () => {
        server = new WS("ws://localhost:8080/ws", {jsonProtocol: true});
        client = new WebSocket("ws://localhost:8080/ws");
    });

    afterEach(() => {
        WS.clean();
    });

    it('should render login page if the user is not logged in', () => {
        const {container} = render(<Context.Provider value={{username: '', setSocket: jest.fn()}}>
            <Webpage/> </Context.Provider>);

        expect(container).toMatchSnapshot();
    });

    it('should render home page if the user is logged in', async () => {
        const {container} = render(<Context.Provider value={{username: 'test-username', socket: client}}>
            <Webpage/> </Context.Provider>);
        await server.connected;

        expect(container).toMatchSnapshot();
    });
});
