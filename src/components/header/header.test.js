import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import Header from "./header";

describe('Header', () => {
    it('should render the component', () => {
        const {container} = render(<Header/>);

        expect(container).toMatchSnapshot();
    });
});
