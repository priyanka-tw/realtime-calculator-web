import React, {useEffect, useContext} from 'react';
import LoginContainer from "./login.styles";
import {URLS} from "../../constants/constants";
import Context from '../../services/global-context-provider/context';
const Login = () => {

    const {setSocket} = useContext(Context);

    useEffect(() => {
        const socket = new WebSocket(URLS.WEBSOCKET);
        socket.onopen = () => {
            console.log("connected to server via ws.");
        };
        socket.onclose = () => {
            console.log("disconnected from server via ws.");
        };
        setSocket(socket);
    }, [setSocket]);

    return (
        <LoginContainer/>
    );
}
export default Login;