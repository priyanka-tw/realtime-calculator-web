import React, {useContext, useState} from 'react';
import {LABELS} from '../../constants/constants';
import {InputButtonWrapper, LoginWrapper, NameInput, StyledButton} from "./sign-in.styles";
import Context from "../../services/global-context-provider/context";

const SignIn = () => {

    const {socket, setUsername} = useContext(Context);
    const [name, setName] = useState('');

    const onNameUpdate = (name) => {
        setName(name);
    }

    const onStart = () => {
        socket.send(JSON.stringify({event: "login", data: name}));
        setUsername(name);
    }

    const handleKeyPress = (event) => {
        console.log('in the handle key press')
        if(event.key === 'Enter' && name){
            onStart();
        }
    }

    return (
        <LoginWrapper>
            <InputButtonWrapper>
                <NameInput
                    data-testid='username'
                    placeholder={LABELS.ENTER_YOUR_NAME}
                    autoFocus
                    onKeyPress={handleKeyPress}
                    onChange={({target}) => onNameUpdate(target.value)}
                />
                <StyledButton
                    data-testid='start-button'
                    onClick={onStart}>{LABELS.START}</StyledButton>
            </InputButtonWrapper>
        </LoginWrapper>
    );
}

export default SignIn;