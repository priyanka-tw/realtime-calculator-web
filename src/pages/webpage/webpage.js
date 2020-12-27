import React from 'react';
import {useContext} from 'react';
import Login from "../login/login";
import Context from "../../services/global-context-provider/context";
import Home from "../home/home";

const Webpage = () => {

    const {username} = useContext(Context);

    if (username) {
        return <Home/>;
    }
    return <Login/>;
};

export default Webpage;
