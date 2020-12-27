import React from 'react';
import {H2, HeaderWrapper, Icon} from "./header.style";
import {LABELS} from '../../constants/constants';
import img from '../../assets/calculator.svg';

const Header = () => {

    return (
        <HeaderWrapper>
            <Icon src={img}/>
            <H2>{LABELS.CALCULATOR}</H2>
        </HeaderWrapper>
    );
};

export default Header;