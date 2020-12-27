import React, {useContext, useEffect, useState} from 'react';
import {H3, Wrapper} from "./additional-data.style";
import Context from "../../../services/global-context-provider/context";

const AdditionalData = () => {

    const {socket, username, setUsername} = useContext(Context);
    const [loggedInUsers, setLoggedInUsers] = useState(1);

    const handleLogout = () => {
        socket.send(JSON.stringify({event: 'logout', data: username}));
        setUsername('');
    };

    useEffect(() => {
        socket.onclose = () => {
            console.log("disconnected from server via ws.");
        };
        if (username) {
            socket.addEventListener('message', function (event) {
                const {event: eventName, data} = JSON.parse(event.data);
                if (eventName === "logged in users") {
                    setLoggedInUsers(data);
                }
            });
        }
    }, [loggedInUsers, socket, username, setUsername]);

    const capitalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
        <>
            <Wrapper>
                <div>
                    <H3 data-testid="greet-message">
                        Hi {capitalize(username)}, currently connected users: {loggedInUsers}
                    </H3>
                </div>
                <button type="button"
                        onClick={handleLogout}
                        data-testid="logout-button"
                > logout</button>
            </Wrapper>
        </>
    );
};

export default AdditionalData;