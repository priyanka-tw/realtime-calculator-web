import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {LABELS} from '../../constants/constants';
import {InputButtonWrapper, LoginWrapper, NameInput, StyledButton} from "./sign-in.styles";
import Context from "../../services/global-context-provider/context";

const SignIn = ({isSubmitDisable}) => {

    const {socket, setUsername} = useContext(Context);
    const [name, setName] = useState('');

    const onNameUpdate = (name) => {
        setName(name);
    };

    const onStart = () => {
        if (name !== '') {
            socket.send(JSON.stringify({event: "login", data: name}));
            setUsername(name);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && name && !isSubmitDisable) {
            onStart();
        }
    };

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
                    disabled={isSubmitDisable}
                    data-testid='start-button'
                    onClick={onStart}>{LABELS.START}</StyledButton>
            </InputButtonWrapper>
        </LoginWrapper>
    );
};

SignIn.propTypes = {
    isSubmitDisable: PropTypes.bool.isRequired,
};

export default SignIn;