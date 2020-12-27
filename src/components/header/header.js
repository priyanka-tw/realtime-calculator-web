import React, {useContext} from 'react';
import {H2, HeaderWrapper, Icon} from "./header.style";
import {LABELS} from '../../constants/constants';
import img from '../../assets/calculator.svg';
import Context from "../../services/global-context-provider/context";
import AdditionalData from "./additional-data/additional-data";

const Header = () => {

    const {username} = useContext(Context);

    return (
        <HeaderWrapper>
            <Icon src={img}/>
            <H2>{LABELS.CALCULATOR}</H2>
            {username && <AdditionalData/>}
        </HeaderWrapper>
    );
};

export default Header;