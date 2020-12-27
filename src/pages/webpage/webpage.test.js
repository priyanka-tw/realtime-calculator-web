import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import Context from "../../services/global-context-provider/context";
import Webpage from "./webpage";

describe('Webpage', () => {

    it('should render login page if the user is not logged in', () => {
        const {container} = render(<Context.Provider value={{username: '', setSocket: jest.fn()}}>
            <Webpage/> </Context.Provider>)

        expect(container).toMatchSnapshot();
    });

    it('should render home page if the user is logged in', () => {
        const {container} = render(<Context.Provider value={{username: 'test-username'}}>
            <Webpage/> </Context.Provider>)

        expect(container).toMatchSnapshot();
    });
});
