import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import Context from "../../services/global-context-provider/context";
import WS from "jest-websocket-mock";
import HistoryPanel from "./history-panel";

describe('History panel', () => {
    let server, client;

    beforeEach(async () => {
        server = new WS("ws://localhost:8080/ws", {jsonProtocol: true});
        client = new WebSocket("ws://localhost:8080/ws");
    });

    afterEach(() => {
        WS.clean();
    });

    it('should render history panel with descending order of events', async () => {
        const {container} = render(<Context.Provider value={{socket: client}}>
            <HistoryPanel/> </Context.Provider>);
        await server.connected;

        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '1+4 = 5'});

        expect(container).toMatchSnapshot();
    });

    it('should render history panel with maximum of 10 records', async () => {
        const {container} = render(<Context.Provider value={{socket: client}}>
            <HistoryPanel/> </Context.Provider>);
        await server.connected;

        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '1+4 = 5'});
        server.send({event: 'history', data: '5-2 = 3'});
        server.send({event: 'history', data: '9*7 = 63'});
        server.send({event: 'history', data: '4/2 = 2'});
        server.send({event: 'history', data: '7-3 = 4'});
        server.send({event: 'history', data: '56*4 = 224'});
        server.send({event: 'history', data: '54-32 = 22'});
        server.send({event: 'history', data: '10+2 = 12'});
        server.send({event: 'history', data: '4*6 = 18'});
        server.send({event: 'history', data: '200*2 = 400'});

        expect(container).toMatchSnapshot();
    });

    it('should maintain order for newly entered result if existing values are same', async () => {
        const {container} = render(<Context.Provider value={{socket: client}}>
            <HistoryPanel/> </Context.Provider>);
        await server.connected;

        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*3 = 18'});
        server.send({event: 'history', data: '6*5 = 30'});

        expect(container).toMatchSnapshot();
    });

});
