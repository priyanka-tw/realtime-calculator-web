import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import WS from "jest-websocket-mock";
import Header from "./header";
import Context from "../../services/global-context-provider/context";

describe('Header', () => {
    let server, client;

    beforeEach(async () => {
        server = new WS("ws://localhost:8080/ws", {jsonProtocol: true});
        client = new WebSocket("ws://localhost:8080/ws");
    });

    afterEach(() => {
        WS.clean();
    });
    it('should render the component', () => {
        const {container} = render(<Header/>);

        expect(container).toMatchSnapshot();
    });

    it('should render additional data only when user is logged in', async () => {
        const {container} = render(<Context.Provider value={{username: 'test-username', socket: client}}>
            <Header/></Context.Provider>);
        await server.connected;

        expect(container).toMatchSnapshot();
    });
});
