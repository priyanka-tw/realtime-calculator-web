import React, {useEffect} from 'react';
import LoginContainer from "./login.styles";
import URLS from "../../constants/constants";

const Login = () => {

    useEffect(() => {
        const socket = new WebSocket(URLS.WEBSOCKET);
        socket.onopen = () => {
            console.log("connected to server via ws.");
        };
        socket.onclose = () => {
            console.log("disconnected from server via ws.");
        };
    });

    return (
        <LoginContainer/>
    );
}
export default Login;