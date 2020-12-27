import React, {useEffect, useContext, useState} from 'react';
import LoginContainer from "./login.styles";
import {URLS} from "../../constants/constants";
import Context from '../../services/global-context-provider/context';
import SignIn from "../../components/sign-in/sign-in";
import Header from "../../components/header/header";
const Login = () => {

    const {setSocket} = useContext(Context);
    const [isSubmitDisable, setIsSubmitDisable] = useState(true);

    useEffect(() => {
        const socket = new WebSocket(URLS.WEBSOCKET);
        socket.onopen = () => {
            console.log("connected to server via ws.");
            setIsSubmitDisable(false);
        };
        socket.onclose = () => {
            console.log("disconnected from server via ws.");
        };
        socket.onerror = () => {
            console.log('error from server via ws.');
        };
        setSocket(socket);
    }, [setSocket]);

    return (
        <LoginContainer>
            <Header />
            <SignIn isSubmitDisable={isSubmitDisable}/>
        </LoginContainer>
    );
};
export default Login;