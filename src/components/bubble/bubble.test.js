import React from 'react';
import {render} from '@testing-library/react';
import 'jest-styled-components';
import Bubble from "../bubble/bubble";

describe('Bubble', () => {

    it('should render the component with given data', () => {
        const {container} = render(<Bubble data={"some random data"}/>);

        expect(container).toMatchSnapshot();
    });
});
