import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import OutputScreen from "./output-screen";

describe('output screen', () => {

    it('should render component', () => {
        const {container} = render(<OutputScreen value={"test-value"}/>);

        expect(container).toMatchSnapshot();
    });

});
